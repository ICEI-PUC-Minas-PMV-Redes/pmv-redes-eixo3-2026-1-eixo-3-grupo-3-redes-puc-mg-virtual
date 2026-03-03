# Código do Cliente (Front-end)
Esta pasta contém o código-fonte do lado cliente da solução - um **Painel Administrativo Web** para gerenciamento de serviços técnicos, inventário de componentes e clientes.

## Organização

### Front-end Web (HTML + CSS + JS)
```
cliente/
├── index.html              # Página principal do painel administrativo
├── login.html              # Página de autenticação do sistema
├── style.css               # Estilos CSS do aplicativo
├── script.js               # Lógica JavaScript do aplicativo
└── README.md               # Documentação do cliente
```

## Estrutura de Funcionalidades

O painel administrativo possui as seguintes seções:

### 1. **Dashboard**
- Visualização do status da rede
- Cards informativos (Servidor online, Firewall ativo)

### 2. **Ordem de Serviço**
- Criação de novas ordens de serviço
- Campos: Número (auto-gerado), Cliente, Descrição, Status, Valor, Data
- Listagem com status coloridos (Aberta, Em Progresso, Concluída, Cancelada)
- Visualização detalhada de cada ordem

### 3. **Inventário**
- Gerenciamento de componentes técnicos
- Campos: Nome do componente, Quantidade
- Adição de novos componentes
- Exemplo pré-carregado: Placa Mãe Asus B550M, Processador Intel Core i7 12700F

### 4. **Clientes**
- Cadastro e gerenciamento de clientes
- Campos: Nome, Contato
- Integração com formulário de Ordem de Serviço

### 5. **Sistema de Autenticação**
- Login com credenciais (usuário: `admin`, senha: `1234`)
- Controle de permissões baseado em perfil
- Logout com limpeza de sessão

## Como Executar

### Desenvolvimento Local
1. **Clone ou baixe os arquivos para uma pasta local**
```bash
   git clone [seu-repositorio]
   cd cliente
```

2. **Abra o arquivo `login.html` no navegador**
   - Clique duplo em `login.html`
   - Ou acesse através de um servidor local:
```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (com http-server instalado)
   npx http-server
```

3. **Faça login com as credenciais padrão**
   - Usuário: `admin`
   - Senha: `1234`

4. **Navegue pelas abas do painel administrativo**
   - Use os botões de navegação no topo
   - Crie ordens de serviço, adicione componentes e clientes

### Testes
- Teste criação de Ordem de Serviço com diferentes status
- Adicione novos componentes ao Inventário
- Cadastre clientes e observe a integração com formulário de OS
- Teste logout e re-login
- Valide permissões (formulários devem estar visíveis apenas para admin)

## Dependências

### Dependências Externas
**Nenhuma!**

### Requisitos do Sistema
- **Navegador moderno** com suporte a:
  - JavaScript
  - CSS
  - LocalStorage API
  - HTML5
- **Navegadores testados:**
  - Chrome 90+
  - Firefox 88+
  - Edge 90+

### Como Instalar Dependências
Não há dependências para instalar. O projeto é standalone e pronto para usar imediatamente.

Se desejar servir via Node.js:
```bash
npm install -g http-server
```

## Recursos Utilizados

### Tecnologias
- **HTML5**
- **CSS3**
- **JavaScript**


## Melhorias Futuras

- [ ] Integração com API backend
- [ ] Banco de dados para persistência
- [ ] Adição de novas seções
- [ ] Autenticação OAuth 2.0
- [ ] Relatórios e gráficos de desempenho
- [ ] Upload de arquivos
- [ ] Modo dark/light theme
- [ ] Multi-idioma
