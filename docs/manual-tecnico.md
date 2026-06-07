# 📘 Manual Técnico – Sistema de Gerenciamento Alpha Hard Informática

**Projeto Extensionista – Eixo 3 | Grupo 03 | PUC Minas | 2026/1**

---

## Sumário

1. [Visão Geral do Sistema](#visão-geral-do-sistema)
2. [Arquitetura da Solução](#arquitetura-da-solução)
3. [Requisitos do Ambiente](#requisitos-do-ambiente)
4. [Estrutura do Repositório](#estrutura-do-repositório)
5. [Instalação e Configuração](#instalação-e-configuração)
6. [Variáveis de Ambiente](#variáveis-de-ambiente)
7. [Execução via Docker](#execução-via-docker)
8. [Módulos do Sistema](#módulos-do-sistema)
9. [Banco de Dados](#banco-de-dados)
10. [API e Endpoints](#api-e-endpoints)
11. [Rede e Infraestrutura](#rede-e-infraestrutura)
12. [Manutenção e Logs](#manutenção-e-logs)
13. [Contribuição e Controle de Versão](#contribuição-e-controle-de-versão)
14. [Licença](#licença)

---

## 1. Visão Geral do Sistema

O sistema foi desenvolvido para a **Alpha Hard Informática**, loja de pequeno porte localizada em Volta Redonda/RJ, com o objetivo de substituir o controle manual por planilhas Excel por uma solução estruturada, com banco de dados relacional, dashboard de acompanhamento e geração de relatórios financeiros.

### Funcionalidades principais

- Cadastro e gerenciamento de clientes
- Criação e controle de **ordens de serviço (OS)**
- Dashboard de visualização de atendimentos
- Geração de **invoices mensais** e relatórios financeiros
- Histórico detalhado de atendimentos para fins administrativos e legais

### Stack tecnológica

| Camada | Tecnologia |
|---|---|
| Back-end | Python |
| Front-end | HTML, CSS, JavaScript |
| Infraestrutura | Docker / Docker Compose |
| Versionamento | Git / GitHub |
| Editor recomendado | VS Code |

---

## 2. Arquitetura da Solução

```
┌────────────────────────────────────┐
│            Cliente (Browser)       │
│        HTML + CSS + JavaScript     │
└────────────────┬───────────────────┘
                 │ HTTP
┌────────────────▼───────────────────┐
│          Servidor Python           │
│         (API / Back-end)           │
└────────────────┬───────────────────┘
                 │
┌────────────────▼───────────────────┐
│          Banco de Dados            │
│        (Persistência de dados)     │
└────────────────────────────────────┘
         (Tudo em container Docker)
```

O front-end se comunica com o back-end Python via requisições HTTP. O back-end persiste os dados no banco de dados. Todos os serviços são orquestrados via **Docker Compose**.

---

## 3. Requisitos do Ambiente

### Software obrigatório

| Ferramenta | Versão mínima recomendada | Link |
|---|---|---|
| Docker | 24.x | https://docs.docker.com/get-docker/ |
| Docker Compose | 2.x (incluído no Docker Desktop) | https://docs.docker.com/compose/ |
| Git | 2.x | https://git-scm.com/ |

### Para desenvolvimento local (opcional)

- Python 3.10+
- Node.js 18+ (caso haja build de front-end)
- VS Code com extensões: Python, Docker, GitLens

### Hardware mínimo

| Recurso | Mínimo |
|---|---|
| CPU | 2 núcleos |
| RAM | 4 GB |
| Armazenamento | 10 GB livres |
| Sistema Operacional | Windows 10/11, Ubuntu 20.04+, macOS 12+ |

---

## 4. Estrutura do Repositório

```
├── README.md                          # Visão geral do projeto
├── docker-compose.yaml                # Orquestração dos containers
├── .gitignore                         # Arquivos ignorados pelo Git
├── LICENSE                            # Licença Apache 2.0
│
├── codigo/
│   ├── servidor/                      # Back-end em Python (API, serviços)
│   └── cliente/                       # Front-end (HTML, CSS, JS)
│
├── docs/
│   ├── especificacao-solucao.md       # Especificação técnica da solução
│   ├── impacto-cliente.md             # Análise de impacto no cliente
│   └── relatorio-extensao.md          # Relatório de extensão
│
└── evidencias/
    ├── fotos/                         # Fotos das visitas e atividades
    ├── atas/                          # Atas de reunião com a comunidade
    ├── termos/                        # Termos de parceria e autorizações
    └── depoimentos/                   # Depoimentos da comunidade
```

---

## 5. Instalação e Configuração

### 5.1 Clonar o repositório

```bash
git clone https://github.com/ICEI-PUC-Minas-PMV-Redes/pmv-redes-eixo3-2026-1-eixo-3-grupo-3-redes-puc-mg-virtual.git
cd pmv-redes-eixo3-2026-1-eixo-3-grupo-3-redes-puc-mg-virtual
```

### 5.2 Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha com as configurações do seu ambiente:

```bash
cp .env.example .env
```

> Veja a seção [Variáveis de Ambiente](#variáveis-de-ambiente) para detalhes de cada parâmetro.

### 5.3 Construir e subir os containers

```bash
docker compose up --build
```

Para rodar em segundo plano (modo detached):

```bash
docker compose up --build -d
```

### 5.4 Verificar se os serviços estão ativos

```bash
docker compose ps
```

Todos os serviços devem estar com status `running`.

---

## 6. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de dados
DB_HOST=db
DB_PORT=5432
DB_NAME=alphahard
DB_USER=admin
DB_PASSWORD=sua_senha_segura

# Aplicação
APP_PORT=8000
APP_ENV=production
SECRET_KEY=sua_chave_secreta

# Front-end
FRONTEND_PORT=3000
```

> **Atenção:** Nunca versione o arquivo `.env` com dados reais. O `.gitignore` já está configurado para ignorá-lo.

---

## 7. Execução via Docker

### Comandos úteis

| Comando | Descrição |
|---|---|
| `docker compose up -d` | Sobe todos os serviços em background |
| `docker compose down` | Para e remove os containers |
| `docker compose logs -f` | Acompanha os logs em tempo real |
| `docker compose restart` | Reinicia todos os serviços |
| `docker compose exec servidor bash` | Acessa o terminal do back-end |
| `docker compose build` | Reconstrói as imagens sem subir |

### Portas padrão

| Serviço | Porta |
|---|---|
| Front-end | `3000` |
| API Back-end | `8000` |
| Banco de Dados | `5432` (interno) |

---

## 8. Módulos do Sistema

### 8.1 Back-end (`codigo/servidor/`)

Desenvolvido em **Python**, responsável por:

- Expor a API REST para o front-end
- Processar regras de negócio (ordens de serviço, clientes, faturamento)
- Integrar com o banco de dados
- Gerar relatórios e invoices

### 8.2 Front-end (`codigo/cliente/`)

Desenvolvido com **HTML, CSS e JavaScript**, responsável por:

- Interface do dashboard de gerenciamento
- Formulários de cadastro de clientes e ordens de serviço
- Visualização de relatórios e histórico de atendimentos

---

## 9. Banco de Dados

O banco de dados armazena de forma estruturada:

- **Clientes**: dados de contato, histórico de atendimentos
- **Ordens de Serviço**: data, técnico, status, descrição do serviço, valor
- **Faturamento**: registros para geração de invoices e relatórios mensais

### Migrations / Inicialização

Ao subir o container pela primeira vez, o banco é inicializado automaticamente com a estrutura base. Caso seja necessário resetar:

```bash
docker compose down -v        # Remove volumes (apaga dados!)
docker compose up --build
```

> ⚠️ O comando `down -v` **apaga todos os dados** persistidos. Use com cautela.

---

## 10. API e Endpoints

A API REST do back-end estará disponível em `http://localhost:8000`.

Exemplos de endpoints esperados:

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/clientes` | Lista todos os clientes |
| `POST` | `/clientes` | Cadastra um novo cliente |
| `GET` | `/ordens` | Lista ordens de serviço |
| `POST` | `/ordens` | Cria nova ordem de serviço |
| `GET` | `/relatorios/mensal` | Gera relatório mensal |

> Consulte a documentação completa da API em `docs/especificacao-solucao.md`.

---

## 11. Rede e Infraestrutura

O projeto utiliza Docker Compose para criar uma rede interna entre os serviços. O roteamento externo é feito via roteador local da loja, que deve estar configurado para liberar as portas necessárias caso o acesso seja remoto.

### Topologia simplificada

```
[Internet / Rede Local]
        │
    [Roteador]
        │
  [Host Docker]
   ├── container: front-end  (porta 3000)
   ├── container: back-end   (porta 8000)
   └── container: banco      (porta 5432, interno)
```

---

## 12. Manutenção e Logs

### Ver logs de um serviço específico

```bash
docker compose logs servidor
docker compose logs -f servidor    # Acompanhar em tempo real
```

### Backup do banco de dados

```bash
docker compose exec db pg_dump -U admin alphahard > backup_$(date +%F).sql
```

### Restaurar backup

```bash
cat backup_YYYY-MM-DD.sql | docker compose exec -T db psql -U admin -d alphahard
```

---

## 13. Contribuição e Controle de Versão

### Fluxo de trabalho Git

1. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
2. Faça commits descritivos:
   ```bash
   git commit -m "feat: adiciona cadastro de clientes"
   ```
3. Envie para o repositório remoto:
   ```bash
   git push origin feature/nome-da-feature
   ```
4. Abra um **Pull Request** no GitHub para revisão.

### Convenção de commits

| Prefixo | Uso |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Atualização de documentação |
| `refactor:` | Refatoração de código |
| `chore:` | Tarefas de manutenção |

---

## 14. Licença

Este projeto está licenciado sob a **Apache License 2.0**. Consulte o arquivo [`LICENSE`](../LICENSE) para mais informações.

---

**Integrantes do Grupo 03:**
- Leonardo Silva Amaral (884122)
- Luis Felipe Guimarães Toledo da Silva (884414)
- Luis Augusto da Silva (888923)
- Talita Rosalina Ribeiro (890496)
- Thiago Hideki do Prado Suzuki (889683)

**Orientador:** Harison Herman Silva

**Parceiro:** Alpha Hard Informática – Volta Redonda/RJ
