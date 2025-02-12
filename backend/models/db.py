from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()

# Get environment and schema settings
environment = os.getenv("FLASK_ENV", "development")  # Default to development if not set
SCHEMA = os.getenv("SCHEMA", "")  # Default to empty if not set

# Helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    """
    Adds schema prefix to table attributes in production mode.
    Only applies to PostgreSQL, not SQLite.
    """
    if environment == "production" and SCHEMA:
        return f"{SCHEMA}.{attr}"
    return attr
