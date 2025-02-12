import os

# Ensure FLASK_ENV is set properly
environment = os.getenv('FLASK_ENV', 'development')

# Define SCHEMA properly for PostgreSQL
SCHEMA = os.environ.get("SCHEMA", "public")  # Default to "public" if not set

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///dev.db')
    SQLALCHEMY_ECHO = True
