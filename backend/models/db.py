from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()

# Get environment variables
environment = os.getenv("FLASK_ENV", "development")  # Default to "development"
SCHEMA = os.getenv("SCHEMA", None)  # Use None instead of ""

# Helper function for adding schema prefixes **only if schema is set**
def add_prefix_for_prod(attr):
    if environment == "production" and SCHEMA:  # Only use schema if it's set
        return f"{SCHEMA}.{attr}"
    return attr
