from flask_sqlalchemy import SQLAlchemy
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

db = SQLAlchemy()

# Helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr

# Association table for Decks and Words
deck_cards = db.Table(
    'deck_cards',
    db.Column(
        'deck_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('decks.id')),
        primary_key=True
    ),
    db.Column(
        'word_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('words.id')),
        primary_key=True
    )
)
