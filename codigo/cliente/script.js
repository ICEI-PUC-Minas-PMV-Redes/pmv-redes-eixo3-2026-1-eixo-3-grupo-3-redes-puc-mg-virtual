const API_BASE_URL = "/api";

let movimentacoes = [];
let clientes = [];
let ordens = [];

async function apiRequest(path, options = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json") ? await response.json() : null;

    if (!response.ok) {
        throw new Error(payload?.erro || "Erro ao comunicar com o servidor.");
    }

    return payload;
}

function formatCurrency(value) {
    return `R$ ${Number(value || 0).toFixed(2)}`;
}

function normalizeDateInput(value) {
    const normalizedValue = (value || "").trim();
    if (!/^\d{2}-\d{2}-\d{4}$/.test(normalizedValue)) {
        throw new Error("Use o formato DD-MM-YYYY.");
    }
    return normalizedValue;
}

function isLoginPage() {
    return window.location.pathname.endsWith("/login.html");
}

async function login() {
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value;
    const erroLogin = document.getElementById("erroLogin");

    erroLogin.textContent = "";

    try {
        const response = await apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify({ usuario, senha })
        });

        localStorage.setItem("perfil", response.perfil);
        localStorage.setItem("usuario", response.usuario);
        window.location.href = "/";
    } catch (error) {
        erroLogin.textContent = error.message;
    }
}

async function logout() {
    try {
        await apiRequest("/auth/logout", {
            method: "POST",
            body: JSON.stringify({})
        });
    } catch (error) {
        console.error(error);
    }

    localStorage.removeItem("perfil");
    localStorage.removeItem("usuario");
    window.location.href = "/login.html";
}

function configurarPermissoes() {
    const perfil = localStorage.getItem("perfil");

    if (perfil !== "admin") {
        document.getElementById("adminAreaRelatorio").style.display = "none";
        document.getElementById("adminAreaClientes").style.display = "none";
        document.getElementById("adminAreaOrdens").style.display = "none";
    }
}

function mostrarSecao(secaoId) {
    document.querySelectorAll(".secao").forEach(secao => {
        secao.classList.remove("ativa");
    });

    document.getElementById(secaoId).classList.add("ativa");
}

async function carregarDashboard() {
    const dashboard = await apiRequest("/dashboard");
    const cards = document.querySelectorAll("#dashboard .card");

    if (cards[0]) {
        cards[0].textContent = `Servidor: ${dashboard.status_rede.servidor}`;
    }

    if (cards[1]) {
        cards[1].textContent = `Firewall: ${dashboard.status_rede.firewall}`;
    }
}

async function atualizarRelatorioFinanceiro(dataInicio = "", dataFim = "") {
    const query = buildPeriodQuery(dataInicio, dataFim);
    const [resumo, entries] = await Promise.all([
        apiRequest(`/financeiro/resumo${query}`),
        apiRequest(`/financeiro/movimentacoes${query}`)
    ]);

    movimentacoes = entries;
    atualizarTabelaMovimentacoes();
    atualizarResumoFinanceiro(resumo);
}

function atualizarTabelaMovimentacoes() {
    const corpoTabela = document.getElementById("corpoTabela");
    if (!corpoTabela) return;

    corpoTabela.innerHTML = "";
    movimentacoes.forEach(mov => {
        const tr = document.createElement("tr");
        tr.className = `linha-${mov.tipo.toLowerCase()}`;
        const endpoint = mov.tipo === "Receita" ? "receitas" : "despesas";
        tr.innerHTML = `
            <td>${mov.data}</td>
            <td><span class="badge-tipo ${mov.tipo.toLowerCase()}">${mov.tipo}</span></td>
            <td>${mov.descricao}</td>
            <td class="valor-${mov.tipo.toLowerCase()}">${formatCurrency(mov.valor)}</td>
            <td><span class="status-badge ${mov.status.toLowerCase()}">${mov.status}</span></td>
            <td><button class="btn-excluir" onclick="excluirMovimentacao(${mov.id}, '${endpoint}')">Excluir</button></td>
        `;
        corpoTabela.appendChild(tr);
    });
}

function atualizarResumoFinanceiro(resumo) {
    document.getElementById("receitaTotal").textContent = formatCurrency(resumo.receita_total);
    document.getElementById("despesasTotal").textContent = formatCurrency(resumo.despesas_total);
    document.getElementById("lucroLiquido").textContent = formatCurrency(resumo.lucro_liquido);
    document.getElementById("pendentesTotal").textContent = formatCurrency(resumo.pendentes_total);

    const lucroElement = document.getElementById("lucroLiquido");
    lucroElement.style.color = resumo.lucro_liquido < 0 ? "#ef4444" : "#10b981";
}

async function filtrarRelatorioPeriodo() {
    const rawDataInicio = document.getElementById("dataInicio").value;
    const rawDataFim = document.getElementById("dataFim").value;

    if (!rawDataInicio || !rawDataFim) {
        alert("Por favor, selecione ambas as datas!");
        return;
    }

    try {
        const dataInicio = normalizeDateInput(rawDataInicio);
        const dataFim = normalizeDateInput(rawDataFim);
        await atualizarRelatorioFinanceiro(dataInicio, dataFim);
    } catch (error) {
        alert(error.message);
    }
}

async function registrarDespesa() {
    const descricao = document.getElementById("descricaoDespesa").value.trim();
    const valor = document.getElementById("valorDespesa").value;
    const categoria = document.getElementById("categoriaDespesa").value;
    const rawData = document.getElementById("dataDespesa").value;

    if (!descricao || !valor || !categoria || !rawData) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    try {
        const data = normalizeDateInput(rawData);
        await apiRequest("/financeiro/despesas", {
            method: "POST",
            body: JSON.stringify({
                descricao,
                valor: Number(valor),
                categoria,
                data
            })
        });

        document.getElementById("descricaoDespesa").value = "";
        document.getElementById("valorDespesa").value = "";
        document.getElementById("categoriaDespesa").value = "";
        document.getElementById("dataDespesa").value = "";

        await atualizarRelatorioFinanceiro();
    } catch (error) {
        alert(error.message);
    }
}

async function registrarReceita() {
    const descricao = document.getElementById("descricaoReceita").value.trim();
    const valor = document.getElementById("valorReceita").value;
    const categoria = document.getElementById("categoriaReceita").value;
    const status = document.getElementById("statusReceita").value;
    const rawData = document.getElementById("dataReceita").value;

    if (!descricao || !valor || !categoria || !status || !rawData) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    try {
        const data = normalizeDateInput(rawData);
        await apiRequest("/financeiro/receitas", {
            method: "POST",
            body: JSON.stringify({
                descricao,
                valor: Number(valor),
                categoria,
                status,
                data
            })
        });

        document.getElementById("descricaoReceita").value = "";
        document.getElementById("valorReceita").value = "";
        document.getElementById("categoriaReceita").value = "";
        document.getElementById("statusReceita").value = "Pendente";
        document.getElementById("dataReceita").value = "";

        await atualizarRelatorioFinanceiro();
    } catch (error) {
        alert(error.message);
    }
}

async function atualizarClientes() {
    clientes = await apiRequest("/clientes");

    const lista = document.getElementById("listaClientes");
    if (!lista) return;

    lista.innerHTML = "";
    clientes.forEach(cliente => {
        const li = document.createElement("li");
        li.textContent = `${cliente.nome} - ${cliente.contato}`;
        lista.appendChild(li);
    });
}

async function excluirMovimentacao(id, tipo) {
    if (!confirm("Deseja excluir esta movimentação?")) {
        return;
    }

    try {
        await apiRequest(`/financeiro/${tipo}/${id}`, { method: "DELETE" });
        await atualizarRelatorioFinanceiro();
        await carregarDashboard();
    } catch (error) {
        alert(error.message);
    }
}

async function adicionarCliente() {
    const nome = document.getElementById("nomeCliente").value.trim();
    const contato = document.getElementById("contatoCliente").value.trim();

    if (!nome || !contato) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    try {
        await apiRequest("/clientes", {
            method: "POST",
            body: JSON.stringify({ nome, contato })
        });

        document.getElementById("nomeCliente").value = "";
        document.getElementById("contatoCliente").value = "";

        await atualizarClientes();
        preencherClientesOS();
    } catch (error) {
        alert(error.message);
    }
}

function gerarNumeroOS() {
    const numeroOS = document.getElementById("numeroOS");
    if (numeroOS) {
        numeroOS.value = "Gerado automaticamente";
    }
}

function preencherClientesOS() {
    const selectCliente = document.getElementById("clienteOS");
    if (!selectCliente) return;

    selectCliente.innerHTML = '<option value="">Selecione um Cliente</option>';
    clientes.forEach(cliente => {
        const option = document.createElement("option");
        option.value = cliente.nome;
        option.textContent = cliente.nome;
        selectCliente.appendChild(option);
    });
}

async function atualizarOrdens(dataInicio = "", dataFim = "") {
    ordens = await apiRequest(`/ordens-servico${buildPeriodQuery(dataInicio, dataFim)}`);

    const lista = document.getElementById("listaOrdens");
    if (!lista) return;

    lista.innerHTML = "";
    ordens.forEach(ordem => {
        const statusClass = ordem.status.toLowerCase().replace(/\s+/g, "-");
        const podeAlterarStatus = ordem.status !== "Concluída" && ordem.status !== "Cancelada";
        const li = document.createElement("li");
        li.className = `ordem-item status-${statusClass}`;
        li.innerHTML = `
            <div class="ordem-numero">${ordem.numero}</div>
            <div class="ordem-detalhes">
                <p><strong>Cliente:</strong> ${ordem.cliente}</p>
                <p><strong>Descrição:</strong> ${ordem.descricao}</p>
                <p><strong>Data:</strong> ${ordem.data}</p>
            </div>
            <div class="ordem-info">
                <p><strong>Status:</strong> <span class="status-badge ${statusClass}">${ordem.status}</span></p>
                <p><strong>Valor:</strong> ${formatCurrency(ordem.valor)}</p>
                <div class="ordem-acoes">
                    ${podeAlterarStatus ? `<button class="btn-acao btn-finalizar" onclick="finalizarOrdem(${ordem.id})">Finalizar</button>` : ""}
                    ${podeAlterarStatus ? `<button class="btn-acao btn-cancelar" onclick="cancelarOrdem(${ordem.id})">Cancelar</button>` : ""}
                    <button class="btn-acao btn-excluir" onclick="excluirOrdem(${ordem.id})">Excluir</button>
                </div>
            </div>
        `;
        lista.appendChild(li);
    });
}

async function finalizarOrdem(id) {
    try {
        await apiRequest(`/ordens-servico/${id}/finalizar`, { method: "POST", body: JSON.stringify({}) });
        await atualizarOrdens();
        await carregarDashboard();
    } catch (error) {
        alert(error.message);
    }
}

async function cancelarOrdem(id) {
    try {
        await apiRequest(`/ordens-servico/${id}/cancelar`, { method: "POST", body: JSON.stringify({}) });
        await atualizarOrdens();
        await carregarDashboard();
    } catch (error) {
        alert(error.message);
    }
}

async function excluirOrdem(id) {
    if (!confirm("Deseja excluir esta ordem de serviço?")) {
        return;
    }

    try {
        await apiRequest(`/ordens-servico/${id}`, { method: "DELETE" });
        await atualizarOrdens();
        await atualizarRelatorioFinanceiro();
        await carregarDashboard();
    } catch (error) {
        alert(error.message);
    }
}

async function adicionarOrdem() {
    const cliente = document.getElementById("clienteOS").value;
    const descricao = document.getElementById("descricaoOS").value.trim();
    const status = document.getElementById("statusOS").value;
    const valor = document.getElementById("valorOS").value;
    const rawData = document.getElementById("dataOS").value;

    if (!cliente || !descricao || !status || !valor || !rawData) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    try {
        const data = normalizeDateInput(rawData);
        await apiRequest("/ordens-servico", {
            method: "POST",
            body: JSON.stringify({
                cliente,
                descricao,
                status,
                valor: Number(valor),
                data
            })
        });

        document.getElementById("descricaoOS").value = "";
        document.getElementById("statusOS").value = "Aberta";
        document.getElementById("valorOS").value = "";
        document.getElementById("dataOS").value = "";
        document.getElementById("clienteOS").value = "";

        gerarNumeroOS();
        await atualizarOrdens();
        await atualizarRelatorioFinanceiro();
    } catch (error) {
        alert(error.message);
    }
}

function buildPeriodQuery(dataInicio, dataFim) {
    const params = new URLSearchParams();
    if (dataInicio) params.set("data_inicio", dataInicio);
    if (dataFim) params.set("data_fim", dataFim);
    const query = params.toString();
    return query ? `?${query}` : "";
}

async function inicializarPainel() {
    if (!localStorage.getItem("perfil")) {
        window.location.href = "/login.html";
        return;
    }

    try {
        configurarPermissoes();
        gerarNumeroOS();
        await Promise.all([
            carregarDashboard(),
            atualizarClientes(),
            atualizarOrdens(),
            atualizarRelatorioFinanceiro()
        ]);
        preencherClientesOS();
    } catch (error) {
        alert(error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (isLoginPage()) {
        if (localStorage.getItem("perfil")) {
            window.location.href = "/";
        }
        return;
    }

    inicializarPainel();
});
