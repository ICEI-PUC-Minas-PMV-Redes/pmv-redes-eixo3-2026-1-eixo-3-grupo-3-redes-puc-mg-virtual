// Credenciais simuladas
const adminUser = "admin";
const adminPass = "1234";

// LOGIN
function login() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (usuario === adminUser && senha === adminPass) {
        localStorage.setItem("perfil", "admin");
        window.location.href = "index.html";
    } else {
        document.getElementById("erroLogin").textContent = "Usuário ou senha inválidos.";
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("perfil");
    window.location.href = "login.html";
}

// Verifica se está logado
if (window.location.pathname.includes("index.html")) {
    const perfil = localStorage.getItem("perfil");

    if (!perfil) {
        window.location.href = "login.html";
    }

    window.onload = function() {
        configurarPermissoes();
        atualizarRelatorioFinanceiro();
        atualizarClientes();
        atualizarOrdens();
        preencherClientesOS();
    }
}

// Controle de permissões
function configurarPermissoes() {
    const perfil = localStorage.getItem("perfil");

    if (perfil !== "admin") {
        document.getElementById("adminAreaRelatorio").style.display = "none";
        document.getElementById("adminAreaClientes").style.display = "none";
        document.getElementById("adminAreaOrdens").style.display = "none";
    }
}

// Alternar seções
function mostrarSecao(secaoId) {
    document.querySelectorAll(".secao").forEach(secao => {
        secao.classList.remove("ativa");
    });

    document.getElementById(secaoId).classList.add("ativa");
}

// Dados simulados
let movimentacoes = [
    { data: "2024-01-15", tipo: "Receita", descricao: "Serviço técnico - OS-001", valor: 150.00, status: "Paga" },
    { data: "2024-01-10", tipo: "Despesa", descricao: "Aluguel do espaço", valor: 500.00, status: "Paga", categoria: "Aluguel" },
    { data: "2024-01-08", tipo: "Despesa", descricao: "Fornecimento de materiais", valor: 200.00, status: "Paga", categoria: "Fornecedores" }
];

let clientes = [
    { nome: "Administrador", contato: "admin@empresa.com" }
];

let ordens = [
    { numero: "OS-001", cliente: "Administrador", descricao: "Manutenção preventiva", status: "Concluída", valor: 150.00, data: "2024-01-15" }
];

let proximoNumeroOS = 2;

function atualizarRelatorioFinanceiro() {
    atualizarTabelaMovimentacoes();
    calcularResumoFinanceiro();
}

function atualizarTabelaMovimentacoes() {
    const corpoTabela = document.getElementById("corpoTabela");
    if (!corpoTabela) return;

    corpoTabela.innerHTML = "";
    movimentacoes.forEach(mov => {
        const tr = document.createElement("tr");
        tr.className = `linha-${mov.tipo.toLowerCase()}`;
        tr.innerHTML = `
            <td>${mov.data}</td>
            <td><span class="badge-tipo ${mov.tipo.toLowerCase()}">${mov.tipo}</span></td>
            <td>${mov.descricao}</td>
            <td class="valor-${mov.tipo.toLowerCase()}">R$ ${mov.valor.toFixed(2)}</td>
            <td><span class="status-badge ${mov.status.toLowerCase()}">${mov.status}</span></td>
        `;
        corpoTabela.appendChild(tr);
    });
}

function calcularResumoFinanceiro() {
    let receita = 0;
    let despesas = 0;
    let pendentes = 0;

    movimentacoes.forEach(mov => {
        if (mov.tipo === "Receita") {
            if (mov.status === "Paga") {
                receita += mov.valor;
            } else if (mov.status === "Pendente") {
                pendentes += mov.valor;
            }
        } else if (mov.tipo === "Despesa") {
            despesas += mov.valor;
        }
    });

    const lucro = receita - despesas;

    document.getElementById("receitaTotal").textContent = `R$ ${receita.toFixed(2)}`;
    document.getElementById("despesasTotal").textContent = `R$ ${despesas.toFixed(2)}`;
    document.getElementById("lucroLiquido").textContent = `R$ ${lucro.toFixed(2)}`;
    document.getElementById("pendentesTotal").textContent = `R$ ${pendentes.toFixed(2)}`;

    // Mudar cor do lucro se negativo
    const lucroElement = document.getElementById("lucroLiquido");
    if (lucro < 0) {
        lucroElement.style.color = "#ef4444";
    } else {
        lucroElement.style.color = "#10b981";
    }
}

function filtrarRelatorioPeriodo() {
    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;

    if (!dataInicio || !dataFim) {
        alert("Por favor, selecione ambas as datas!");
        return;
    }

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    const movimentacoesFiltradas = movimentacoes.filter(mov => {
        const dataMov = new Date(mov.data);
        return dataMov >= inicio && dataMov <= fim;
    });

    const corpoTabela = document.getElementById("corpoTabela");
    corpoTabela.innerHTML = "";

    movimentacoesFiltradas.forEach(mov => {
        const tr = document.createElement("tr");
        tr.className = `linha-${mov.tipo.toLowerCase()}`;
        tr.innerHTML = `
            <td>${mov.data}</td>
            <td><span class="badge-tipo ${mov.tipo.toLowerCase()}">${mov.tipo}</span></td>
            <td>${mov.descricao}</td>
            <td class="valor-${mov.tipo.toLowerCase()}">R$ ${mov.valor.toFixed(2)}</td>
            <td><span class="status-badge ${mov.status.toLowerCase()}">${mov.status}</span></td>
        `;
        corpoTabela.appendChild(tr);
    });

    // Calcular resumo para o período filtrado
    let receita = 0;
    let despesas = 0;
    let pendentes = 0;

    movimentacoesFiltradas.forEach(mov => {
        if (mov.tipo === "Receita") {
            if (mov.status === "Paga") {
                receita += mov.valor;
            } else if (mov.status === "Pendente") {
                pendentes += mov.valor;
            }
        } else if (mov.tipo === "Despesa") {
            despesas += mov.valor;
        }
    });

    const lucro = receita - despesas;

    document.getElementById("receitaTotal").textContent = `R$ ${receita.toFixed(2)}`;
    document.getElementById("despesasTotal").textContent = `R$ ${despesas.toFixed(2)}`;
    document.getElementById("lucroLiquido").textContent = `R$ ${lucro.toFixed(2)}`;
    document.getElementById("pendentesTotal").textContent = `R$ ${pendentes.toFixed(2)}`;

    const lucroElement = document.getElementById("lucroLiquido");
    if (lucro < 0) {
        lucroElement.style.color = "#ef4444";
    } else {
        lucroElement.style.color = "#10b981";
    }
}

function registrarDespesa() {
    const descricao = document.getElementById("descricaoDespesa").value;
    const valor = parseFloat(document.getElementById("valorDespesa").value);
    const categoria = document.getElementById("categoriaDespesa").value;
    const data = document.getElementById("dataDespesa").value;

    if (descricao && valor && categoria && data) {
        movimentacoes.push({
            data,
            tipo: "Despesa",
            descricao: `${descricao} (${categoria})`,
            valor,
            status: "Paga",
            categoria
        });

        // Limpar formulário
        document.getElementById("descricaoDespesa").value = "";
        document.getElementById("valorDespesa").value = "";
        document.getElementById("categoriaDespesa").value = "";
        document.getElementById("dataDespesa").value = "";

        atualizarRelatorioFinanceiro();
    } else {
        alert("Por favor, preencha todos os campos!");
    }
}

function registrarReceita() {
    const descricao = document.getElementById("descricaoReceita").value;
    const valor = parseFloat(document.getElementById("valorReceita").value);
    const categoria = document.getElementById("categoriaReceita").value;
    const status = document.getElementById("statusReceita").value;
    const data = document.getElementById("dataReceita").value;

    if (descricao && valor && categoria && status && data) {
        movimentacoes.push({
            data,
            tipo: "Receita",
            descricao: `${descricao} (${categoria})`,
            valor,
            status: status,
            categoria
        });

        // Limpar formulário
        document.getElementById("descricaoReceita").value = "";
        document.getElementById("valorReceita").value = "";
        document.getElementById("categoriaReceita").value = "";
        document.getElementById("statusReceita").value = "Pendente";
        document.getElementById("dataReceita").value = "";

        atualizarRelatorioFinanceiro();
    } else {
        alert("Por favor, preencha todos os campos!");
    }
}

function atualizarClientes() {
    const lista = document.getElementById("listaClientes");
    if (!lista) return;

    lista.innerHTML = "";
    clientes.forEach(cliente => {
        const li = document.createElement("li");
        li.textContent = `${cliente.nome} - ${cliente.contato}`;
        lista.appendChild(li);
    });
}



function adicionarCliente() {
    const nome = document.getElementById("nomeCliente").value;
    const contato = document.getElementById("contatoCliente").value;

    if (nome && contato) {
        clientes.push({ nome, contato });
        document.getElementById("nomeCliente").value = "";
        document.getElementById("contatoCliente").value = "";
        atualizarClientes();
        preencherClientesOS();
        preencherClientesNF();
    }
}

// Funções para Ordem de Serviço
function gerarNumeroOS() {
    const numeroOS = document.getElementById("numeroOS");
    if (numeroOS) {
        numeroOS.value = `OS-${String(proximoNumeroOS).padStart(3, '0')}`;
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

function atualizarOrdens() {
    const lista = document.getElementById("listaOrdens");
    if (!lista) return;

    lista.innerHTML = "";
    ordens.forEach(ordem => {
        const li = document.createElement("li");
        li.className = `ordem-item status-${ordem.status.toLowerCase().replace(" ", "-")}`;
        li.innerHTML = `
            <div class="ordem-numero">${ordem.numero}</div>
            <div class="ordem-detalhes">
                <p><strong>Cliente:</strong> ${ordem.cliente}</p>
                <p><strong>Descrição:</strong> ${ordem.descricao}</p>
                <p><strong>Data:</strong> ${ordem.data}</p>
            </div>
            <div class="ordem-info">
                <p><strong>Status:</strong> <span class="status-badge ${ordem.status.toLowerCase().replace(" ", "-")}">${ordem.status}</span></p>
                <p><strong>Valor:</strong> R$ ${ordem.valor.toFixed(2)}</p>
            </div>
        `;
        lista.appendChild(li);
    });
}

function adicionarOrdem() {
    const numero = document.getElementById("numeroOS").value;
    const cliente = document.getElementById("clienteOS").value;
    const descricao = document.getElementById("descricaoOS").value;
    const status = document.getElementById("statusOS").value;
    const valor = parseFloat(document.getElementById("valorOS").value);
    const data = document.getElementById("dataOS").value;

    if (numero && cliente && descricao && status && valor && data) {
        ordens.push({ 
            numero, 
            cliente, 
            descricao, 
            status, 
            valor, 
            data 
        });

        // Limpar formulário
        document.getElementById("descricaoOS").value = "";
        document.getElementById("statusOS").value = "Aberta";
        document.getElementById("valorOS").value = "";
        document.getElementById("dataOS").value = "";
        document.getElementById("clienteOS").value = "";

        // Incrementar número para próxima OS
        proximoNumeroOS++;
        gerarNumeroOS();

        atualizarOrdens();
    } else {
        alert("Por favor, preencha todos os campos!");
    }
}
