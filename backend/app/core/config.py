from pydantic import BaseSettings, PostgresDsn, validator
from typing import Any
import secrets


class Settings(BaseSettings):
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    DATABASE_URI: PostgresDsn | None = None
    PROJECT_NAME: str
    DATABASE_ALEMBIC_URL: str
    AWS_SECRET_ACCESS_KEY: str
    AWS_ACCESS_KEY_ID: str
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8

    @validator("DATABASE_URI", pre=True)
    def assemble_db_connection(cls, v: list[str] | None, values: dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql",
            user=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_SERVER"),
            path=f"/{values.get('POSTGRES_DB') or ''}",
        )

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
