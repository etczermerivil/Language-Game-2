from .db import db, environment, SCHEMA, add_prefix_for_prod
from .deck_words import deck_words

class Deck(db.Model):
    __tablename__ = "decks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        nullable=False
    )

    user = db.relationship("User", back_populates="decks")

    # ✅ Use imported association table
    words = db.relationship(
        "Word",
        secondary=deck_words,
        back_populates="decks"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "words": [word.to_dict() for word in self.words] if self.words else []
        }
