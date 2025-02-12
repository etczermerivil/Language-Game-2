from .db import db, environment, SCHEMA, add_prefix_for_prod

deck_words = db.Table(
    "deck_words",
    db.Model.metadata,
    db.Column("deck_id", db.Integer, db.ForeignKey(add_prefix_for_prod("decks.id"), ondelete="CASCADE"), primary_key=True),
    db.Column("word_id", db.Integer, db.ForeignKey(add_prefix_for_prod("words.id"), ondelete="CASCADE"), primary_key=True)
)

# ✅ Ensure schema-awareness in production
if environment == "production":
    deck_words.schema = SCHEMA
