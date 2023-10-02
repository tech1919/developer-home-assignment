from .db import db
from alembic import command
from alembic.config import Config
from app.utils.logger import logger


def init_db(app):
    try:
        db.init_app(app)
        with app.app_context():
            alembic_cfg = Config("alembic.ini")
            command.upgrade(alembic_cfg, "head")
        logger.log("INFO", "Database initialized successfully.")
        return app
    except Exception as e:
        logger.log("ERROR", f"Database initialization failed: {e}")  
        raise Exception("Could not initialize database")