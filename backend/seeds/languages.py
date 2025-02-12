from backend.models import db, Language

def seed_languages():
    english = Language(name="English", code="en")

    db.session.add(english)
    db.session.commit()
    print("Languages seeded successfully.")

def undo_languages():
    db.session.execute("DELETE FROM languages;")
    db.session.commit()
    print("Languages cleared.")
