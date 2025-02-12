
from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User  # Import User model to establish relationship

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
    words = db.relationship(
        "Word",
        secondary="deck_cards",
        back_populates="decks"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "words": [word.to_dict() for word in self.words] if self.words else []
        }
