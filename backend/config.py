# backend/config.py
import os

# If you want to switch logic based on FLASK_ENV:
environment = os.getenv('FLASK_ENV', 'development')

# If you use a Postgres schema in production:
SCHEMA = 'language_game'  # Or whatever your schema name is

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', '').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True
