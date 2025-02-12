from .db import db
from .user import User  # Import User model to establish relationship

class Deck(db.Model):
    __tablename__ = "decks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Relationships
    user = db.relationship("User", back_populates="decks")  # Connect back to User model
    words = db.relationship("Word", secondary="deck_cards", back_populates="decks")

    def __repr__(self):
        return f"<Deck {self.id}: {self.name}>"

    # Add to_dict method
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "words": [word.to_dict() for word in self.words] if self.words else [],
        }
