from __future__ import annotations

import os
from datetime import datetime
from decimal import Decimal, InvalidOperation

from flask import Flask, jsonify, request

from config import Config
from database import ApiError, create_client, create_expense, create_order, create_revenue, db, delete_expense, delete_order, delete_revenue, get_dashboard, get_summary, init_database, list_clients, list_entries, list_orders, login, update_order_status


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)

    with app.app_context():
        init_database()

    @app.after_request
    def add_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PATCH, DELETE, OPTIONS"
        return response

    @app.errorhandler(ApiError)
    def handle_api_error(error: ApiError):
        return jsonify({"erro": error.message}), error.status_code

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({"status": "ok"})

    @app.route("/api/auth/login", methods=["POST", "OPTIONS"])
    def auth_login():
        if request.method == "OPTIONS":
            return ("", 204)

        payload = require_payload(request.get_json(silent=True))
        return jsonify(login(require_text(payload, "usuario"), require_text(payload, "senha")))

    @app.route("/api/auth/logout", methods=["POST", "OPTIONS"])
    def auth_logout():
        if request.method == "OPTIONS":
            return ("", 204)
        return jsonify({"mensagem": "Logout realizado com sucesso."})

    @app.route("/api/dashboard", methods=["GET"])
    def dashboard():
        return jsonify(get_dashboard())

    @app.route("/api/clientes", methods=["GET"])
    def get_clients():
        return jsonify(list_clients())

    @app.route("/api/clientes", methods=["POST", "OPTIONS"])
    def post_client():
        if request.method == "OPTIONS":
            return ("", 204)

        payload = require_payload(request.get_json(silent=True))
        return jsonify(create_client(require_text(payload, "nome"), require_text(payload, "contato"))), 201

    @app.route("/api/ordens-servico", methods=["GET"])
    def get_service_orders():
        data_inicio, data_fim = parse_period()
        return jsonify(list_orders(data_inicio, data_fim))

    @app.route("/api/ordens-servico", methods=["POST", "OPTIONS"])
    def post_service_order():
        if request.method == "OPTIONS":
            return ("", 204)

        payload = require_payload(request.get_json(silent=True))
        return (
            jsonify(
                create_order(
                    parse_optional_int(payload.get("cliente_id"), "cliente_id"),
                    parse_optional_text(payload.get("cliente"), "cliente"),
                    require_text(payload, "descricao"),
                    require_text(payload, "status"),
                    require_positive_amount(payload, "valor"),
                    require_date(payload, "data"),
                )
            ),
            201,
        )

    @app.route("/api/ordens-servico/<int:order_id>", methods=["DELETE", "OPTIONS"])
    def remove_service_order(order_id: int):
        if request.method == "OPTIONS":
            return ("", 204)
        return jsonify(delete_order(order_id))

    @app.route("/api/ordens-servico/<int:order_id>/finalizar", methods=["POST", "OPTIONS"])
    def finish_service_order(order_id: int):
        if request.method == "OPTIONS":
            return ("", 204)
        return jsonify(update_order_status(order_id, "Concluída"))

    @app.route("/api/ordens-servico/<int:order_id>/cancelar", methods=["POST", "OPTIONS"])
    def cancel_service_order(order_id: int):
        if request.method == "OPTIONS":
            return ("", 204)
        return jsonify(update_order_status(order_id, "Cancelada"))

    @app.route("/api/financeiro/movimentacoes", methods=["GET"])
    def get_financial_entries():
        data_inicio, data_fim = parse_period()
        return jsonify(list_entries(data_inicio, data_fim))

    @app.route("/api/financeiro/resumo", methods=["GET"])
    def get_financial_summary():
        data_inicio, data_fim = parse_period()
        return jsonify(get_summary(data_inicio, data_fim))

    @app.route("/api/financeiro/despesas", methods=["POST", "OPTIONS"])
    def post_expense():
        if request.method == "OPTIONS":
            return ("", 204)

        payload = require_payload(request.get_json(silent=True))
        return (
            jsonify(
                create_expense(
                    require_text(payload, "descricao"),
                    require_positive_amount(payload, "valor"),
                    require_text(payload, "categoria"),
                    require_date(payload, "data"),
                )
            ),
            201,
        )

    @app.route("/api/financeiro/despesas/<int:entry_id>", methods=["DELETE", "OPTIONS"])
    def remove_expense(entry_id: int):
        if request.method == "OPTIONS":
            return ("", 204)
        return jsonify(delete_expense(entry_id))

    @app.route("/api/financeiro/receitas", methods=["POST", "OPTIONS"])
    def post_revenue():
        if request.method == "OPTIONS":
            return ("", 204)

        payload = require_payload(request.get_json(silent=True))
        return (
            jsonify(
                create_revenue(
                    require_text(payload, "descricao"),
                    require_positive_amount(payload, "valor"),
                    require_text(payload, "categoria"),
                    require_text(payload, "status"),
                    require_date(payload, "data"),
                )
            ),
            201,
        )

    @app.route("/api/financeiro/receitas/<int:entry_id>", methods=["DELETE", "OPTIONS"])
    def remove_revenue(entry_id: int):
        if request.method == "OPTIONS":
            return ("", 204)
        return jsonify(delete_revenue(entry_id))

    return app


def require_payload(payload):
    if not isinstance(payload, dict):
        raise ApiError("O corpo da requisicao deve ser um objeto JSON.", 400)
    return payload


def require_text(payload, field_name: str) -> str:
    value = payload.get(field_name)
    if not isinstance(value, str) or not value.strip():
        raise ApiError(f"O campo '{field_name}' e obrigatorio.", 400)
    return value.strip()


def require_positive_amount(payload, field_name: str) -> Decimal:
    value = payload.get(field_name)
    if value in (None, ""):
        raise ApiError(f"O campo '{field_name}' e obrigatorio.", 400)

    try:
        amount = Decimal(str(value)).quantize(Decimal("0.01"))
    except (InvalidOperation, ValueError) as exc:
        raise ApiError(f"O campo '{field_name}' deve ser numerico.", 400) from exc

    if amount <= 0:
        raise ApiError(f"O campo '{field_name}' deve ser maior que zero.", 400)
    return amount


def require_date(payload, field_name: str):
    value = require_text(payload, field_name)
    try:
        return datetime.strptime(value, "%Y-%m-%d").date()
    except ValueError as exc:
        raise ApiError(f"O campo '{field_name}' deve estar no formato YYYY-MM-DD.", 400) from exc


def optional_date(value, field_name: str):
    if value in (None, ""):
        return None
    try:
        return datetime.strptime(value, "%Y-%m-%d").date()
    except ValueError as exc:
        raise ApiError(f"O campo '{field_name}' deve estar no formato YYYY-MM-DD.", 400) from exc


def parse_optional_int(value, field_name: str) -> int | None:
    if value in (None, ""):
        return None
    try:
        return int(value)
    except (TypeError, ValueError) as exc:
        raise ApiError(f"O campo '{field_name}' deve ser numerico.", 400) from exc


def parse_optional_text(value, field_name: str) -> str | None:
    if value in (None, ""):
        return None
    if not isinstance(value, str) or not value.strip():
        raise ApiError(f"O campo '{field_name}' deve ser texto.", 400)
    return value.strip()


def parse_period():
    data_inicio = optional_date(request.args.get("data_inicio"), "data_inicio")
    data_fim = optional_date(request.args.get("data_fim"), "data_fim")
    if data_inicio and data_fim and data_inicio > data_fim:
        raise ApiError("'data_inicio' nao pode ser maior que 'data_fim'.", 400)
    return data_inicio, data_fim


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "8080")))
