from __future__ import annotations

from datetime import date, datetime, timezone
from decimal import Decimal
from pathlib import Path

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Date, DateTime, ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship, joinedload

db = SQLAlchemy()

ORDEM_STATUS = {"Aberta", "Em Progresso", "Concluída", "Cancelada"}
RECEITA_STATUS = {"Pendente", "Paga"}
DESPESA_CATEGORIAS = {"Fornecedores", "Aluguel", "Manutenção", "Outros"}
RECEITA_CATEGORIAS = {"Serviços", "Consultoria", "Manutenção", "Suporte", "Outros"}
ALIASES = {"Concluida": "Concluída", "Manutencao": "Manutenção", "Servicos": "Serviços"}


class ApiError(Exception):
    def __init__(self, message: str, status_code: int = 400) -> None:
        super().__init__(message)
        self.message = message
        self.status_code = status_code


class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(80), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    profile: Mapped[str] = mapped_column(String(30), nullable=False, default="admin")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)


class Client(db.Model):
    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    contact: Mapped[str] = mapped_column(String(160), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    service_orders: Mapped[list["ServiceOrder"]] = relationship(back_populates="client")


class ServiceOrder(db.Model):
    __tablename__ = "service_orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    number: Mapped[str | None] = mapped_column(String(20), unique=True)
    client_id: Mapped[int] = mapped_column(ForeignKey("clients.id"), nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False)
    value: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    service_date: Mapped[date] = mapped_column(Date, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    client: Mapped[Client] = relationship(back_populates="service_orders")


class FinancialEntry(db.Model):
    __tablename__ = "financial_entries"

    id: Mapped[int] = mapped_column(primary_key=True)
    entry_type: Mapped[str] = mapped_column(String(20), nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(60), nullable=False)
    value: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False)
    entry_date: Mapped[date] = mapped_column(Date, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)


def init_database() -> None:
    sql_path = Path(__file__).with_name("init.sql")
    statements = [part.strip() for part in sql_path.read_text(encoding="utf-8").split(";") if part.strip()]

    with db.engine.begin() as connection:
        for statement in statements:
            connection.exec_driver_sql(statement)


def login(username: str, password: str) -> dict[str, str]:
    user = User.query.filter_by(username=username).first()
    if user is None or user.password != password:
        raise ApiError("Usuario ou senha invalidos.", 401)
    return {"mensagem": "Login realizado com sucesso.", "usuario": user.username, "perfil": user.profile}


def list_clients() -> list[dict]:
    return [serialize_client(client) for client in Client.query.order_by(Client.name.asc()).all()]


def create_client(name: str, contact: str) -> dict:
    if Client.query.filter_by(name=name).first() is not None:
        raise ApiError("Ja existe um cliente com esse nome.", 409)

    client = Client(name=name, contact=contact)
    db.session.add(client)
    db.session.commit()
    return serialize_client(client)


def list_orders(start_date=None, end_date=None) -> list[dict]:
    query = ServiceOrder.query.options(joinedload(ServiceOrder.client)).order_by(ServiceOrder.service_date.desc(), ServiceOrder.id.desc())
    if start_date is not None:
        query = query.filter(ServiceOrder.service_date >= start_date)
    if end_date is not None:
        query = query.filter(ServiceOrder.service_date <= end_date)
    return [serialize_order(order) for order in query.all()]


def create_order(client_id, client_name, description: str, status: str, value, service_date) -> dict:
    resolved_status = normalize_choice(status, ORDEM_STATUS, "status")
    client = resolve_client(client_id, client_name)

    service_order = ServiceOrder(
        client_id=client.id,
        description=description,
        status=resolved_status,
        value=value,
        service_date=service_date,
    )
    db.session.add(service_order)
    db.session.flush()
    service_order.number = f"OS-{service_order.id:03d}"
    db.session.commit()

    created_order = ServiceOrder.query.options(joinedload(ServiceOrder.client)).filter_by(id=service_order.id).first()
    return serialize_order(created_order)


def delete_order(order_id: int) -> dict[str, str]:
    order = db.session.get(ServiceOrder, order_id)
    if order is None:
        raise ApiError("Ordem de servico nao encontrada.", 404)

    db.session.delete(order)
    db.session.commit()
    return {"mensagem": "Ordem de servico removida com sucesso."}


def update_order_status(order_id: int, status: str) -> dict:
    resolved_status = normalize_choice(status, ORDEM_STATUS, "status")
    order = db.session.get(ServiceOrder, order_id)
    if order is None:
        raise ApiError("Ordem de servico nao encontrada.", 404)

    order.status = resolved_status
    db.session.commit()

    updated_order = ServiceOrder.query.options(joinedload(ServiceOrder.client)).filter_by(id=order.id).first()
    return serialize_order(updated_order)


def list_entries(start_date=None, end_date=None) -> list[dict]:
    query = FinancialEntry.query.order_by(FinancialEntry.entry_date.desc(), FinancialEntry.id.desc())
    if start_date is not None:
        query = query.filter(FinancialEntry.entry_date >= start_date)
    if end_date is not None:
        query = query.filter(FinancialEntry.entry_date <= end_date)
    return [serialize_entry(entry) for entry in query.all()]


def create_expense(description: str, value, category: str, entry_date) -> dict:
    resolved_category = normalize_choice(category, DESPESA_CATEGORIAS, "categoria")
    entry = FinancialEntry(
        entry_type="Despesa",
        description=description,
        category=resolved_category,
        value=value,
        status="Paga",
        entry_date=entry_date,
    )
    db.session.add(entry)
    db.session.commit()
    return serialize_entry(entry)


def delete_expense(entry_id: int) -> dict[str, str]:
    return delete_entry(entry_id, "Despesa", "Despesa nao encontrada.")


def create_revenue(description: str, value, category: str, status: str, entry_date) -> dict:
    resolved_category = normalize_choice(category, RECEITA_CATEGORIAS, "categoria")
    resolved_status = normalize_choice(status, RECEITA_STATUS, "status")
    entry = FinancialEntry(
        entry_type="Receita",
        description=description,
        category=resolved_category,
        value=value,
        status=resolved_status,
        entry_date=entry_date,
    )
    db.session.add(entry)
    db.session.commit()
    return serialize_entry(entry)


def delete_revenue(entry_id: int) -> dict[str, str]:
    return delete_entry(entry_id, "Receita", "Receita nao encontrada.")


def get_summary(start_date=None, end_date=None) -> dict[str, float]:
    query = FinancialEntry.query
    if start_date is not None:
        query = query.filter(FinancialEntry.entry_date >= start_date)
    if end_date is not None:
        query = query.filter(FinancialEntry.entry_date <= end_date)

    receita_total = Decimal("0.00")
    despesas_total = Decimal("0.00")
    pendentes_total = Decimal("0.00")

    for entry in query.all():
        if entry.entry_type == "Receita" and entry.status == "Paga":
            receita_total += entry.value
        elif entry.entry_type == "Receita" and entry.status == "Pendente":
            pendentes_total += entry.value
        elif entry.entry_type == "Despesa":
            despesas_total += entry.value

    return {
        "receita_total": float(receita_total),
        "despesas_total": float(despesas_total),
        "pendentes_total": float(pendentes_total),
        "lucro_liquido": float(receita_total - despesas_total),
    }


def get_dashboard() -> dict:
    return {
        "status_rede": {"servidor": "Online", "firewall": "Ativo"},
        "clientes": Client.query.count(),
        "ordens_abertas": ServiceOrder.query.filter(ServiceOrder.status.in_(("Aberta", "Em Progresso"))).count(),
        "financeiro": get_summary(),
    }


def resolve_client(client_id, client_name) -> Client:
    if client_id is not None:
        client = db.session.get(Client, client_id)
    elif client_name:
        client = Client.query.filter_by(name=client_name).first()
    else:
        raise ApiError("Informe 'cliente_id' ou 'cliente'.", 400)

    if client is None:
        raise ApiError("Cliente nao encontrado.", 404)
    return client


def normalize_choice(value: str, allowed_values: set[str], field_name: str) -> str:
    normalized = ALIASES.get(value, value)
    if normalized not in allowed_values:
        allowed_text = ", ".join(sorted(allowed_values))
        raise ApiError(f"O campo '{field_name}' deve ser um destes valores: {allowed_text}.", 400)
    return normalized


def delete_entry(entry_id: int, expected_type: str, not_found_message: str) -> dict[str, str]:
    entry = db.session.get(FinancialEntry, entry_id)
    if entry is None or entry.entry_type != expected_type:
        raise ApiError(not_found_message, 404)

    db.session.delete(entry)
    db.session.commit()
    return {"mensagem": f"{expected_type} removida com sucesso."}


def serialize_client(client: Client) -> dict:
    return {
        "id": client.id,
        "nome": client.name,
        "contato": client.contact,
        "created_at": client.created_at.isoformat(),
    }


def serialize_order(order: ServiceOrder) -> dict:
    return {
        "id": order.id,
        "numero": order.number,
        "cliente_id": order.client_id,
        "cliente": order.client.name,
        "descricao": order.description,
        "status": order.status,
        "valor": float(order.value),
        "data": order.service_date.isoformat(),
        "created_at": order.created_at.isoformat(),
    }


def serialize_entry(entry: FinancialEntry) -> dict:
    return {
        "id": entry.id,
        "tipo": entry.entry_type,
        "descricao": entry.description,
        "categoria": entry.category,
        "valor": float(entry.value),
        "status": entry.status,
        "data": entry.entry_date.isoformat(),
        "created_at": entry.created_at.isoformat(),
    }
