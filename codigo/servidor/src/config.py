from __future__ import annotations

import os


def build_database_url() -> str:
    database_url = os.getenv("DATABASE_URL")
    if database_url:
        return database_url

    user = os.getenv("MARIADB_USER", "root")
    password = os.getenv("MARIADB_PASSWORD", "root")
    host = os.getenv("MARIADB_HOST", "127.0.0.1")
    port = os.getenv("MARIADB_PORT", "3306")
    database = os.getenv("MARIADB_DATABASE", "alphahard_admin")
    return f"mysql+pymysql://{user}:{password}@{host}:{port}/{database}"


class Config:
    JSON_SORT_KEYS = False
    SQLALCHEMY_DATABASE_URI = build_database_url()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEFAULT_ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
    DEFAULT_ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "1234")
