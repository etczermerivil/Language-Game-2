from backend.models import db, Deck, Word, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_decks():
    # Fetch an existing user
    user = User.query.first()
    if not user:
        print("No users available to seed decks. Run user seeds first.")
        return

    # Fetch words for association
    words = Word.query.all()
    if not words:
        print("No words available to seed decks. Run word seeds first.")
        return

    # Create example decks
    deck1 = Deck(name="Starter Deck", user_id=user.id)
    deck2 = Deck(name="Advanced Deck", user_id=user.id)

    db.session.add(deck1)
    db.session.add(deck2)
    db.session.commit()

    # Avoid duplicate associations
    for word in words[:5]:
        if word not in deck1.words:
            deck1.words.append(word)

    for word in words[5:10]:
        if word not in deck2.words:
            deck2.words.append(word)

    db.session.commit()

    print("Decks seeded successfully.")


def undo_decks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.decks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM decks"))

    db.session.commit()
    print("Decks cleared successfully.")
