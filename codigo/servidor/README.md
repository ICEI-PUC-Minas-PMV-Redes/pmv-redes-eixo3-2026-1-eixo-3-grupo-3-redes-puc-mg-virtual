# Código do Servidor (Back-end)

API REST em **Flask** com **MariaDB**, gerada a partir dos formularios do front-end em `codigo/cliente/`.

## Estrutura

```text
servidor/
├── src/
│   ├── app.py         # Endpoints HTTP
│   ├── config.py      # Configuracao da aplicacao
│   ├── database.py    # Modelos, queries e inicializacao
│   └── init.sql       # Estrutura inicial do banco
├── requirements.txt
└── README.md
```

## Como executar

```bash
cd codigo/servidor
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

export MARIADB_HOST=127.0.0.1
export MARIADB_PORT=3306
export MARIADB_DATABASE=alphahard_admin
export MARIADB_USER=root
export MARIADB_PASSWORD=root

python src/app.py
```

## Endpoints

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/dashboard`
- `GET/POST /api/clientes`
- `GET/POST /api/ordens-servico`
- `GET /api/financeiro/movimentacoes`
- `GET /api/financeiro/resumo`
- `POST /api/financeiro/despesas`
- `POST /api/financeiro/receitas`

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | URL completa do MariaDB | `mysql+pymysql://root:root@127.0.0.1:3306/alphahard_admin` |
| `MARIADB_HOST` | Host do banco | `127.0.0.1` |
| `MARIADB_PORT` | Porta do banco | `3306` |
| `MARIADB_DATABASE` | Nome do banco | `alphahard_admin` |
| `MARIADB_USER` | Usuário do banco | `root` |
| `MARIADB_PASSWORD` | Senha do banco | `root` |
| `ADMIN_USERNAME` | Usuário inicial | `admin` |
| `ADMIN_PASSWORD` | Senha inicial | `1234` |
