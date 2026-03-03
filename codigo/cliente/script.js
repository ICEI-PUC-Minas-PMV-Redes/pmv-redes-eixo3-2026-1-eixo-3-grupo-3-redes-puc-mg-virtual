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
        atualizarInventario();
        atualizarClientes();
        atualizarOrdens();
        preencherClientesOS();
        gerarNumeroOS();
    }
}

// Controle de permissões
function configurarPermissoes() {
    const perfil = localStorage.getItem("perfil");

    if (perfil !== "admin") {
        document.getElementById("adminAreaInventario").style.display = "none";
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
let inventario = [
    { nome: "Placa Mãe Asus B550M", quantidade: 5 },
    { nome: "Processador Intel Core i7 12700F", quantidade: 3 }
];

let clientes = [
    { nome: "Administrador", contato: "admin@empresa.com" }
];

let ordens = [
    { numero: "OS-001", cliente: "Leonardo", descricao: "Manutenção preventiva", status: "Concluída", valor: 150.00, data: "02-03-2026" }
];

let proximoNumeroOS = 2;

function atualizarInventario() {
    const lista = document.getElementById("listaInventario");
    if (!lista) return;

    lista.innerHTML = "";
    inventario.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nome} - Quantidade: ${item.quantidade}`;
        lista.appendChild(li);
    });
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

function adicionarComponente() {
    const nome = document.getElementById("nomeComponente").value;
    const quantidade = document.getElementById("quantidadeComponente").value;

    if (nome && quantidade) {
        inventario.push({ nome, quantidade: parseInt(quantidade) });
        document.getElementById("nomeComponente").value = "";
        document.getElementById("quantidadeComponente").value = "";
        atualizarInventario();
    }
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
