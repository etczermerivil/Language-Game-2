from backend.models import db, PartOfSpeech

def seed_parts_of_speech():
    noun = PartOfSpeech(name="Noun", color_code="#1E90FF")
    verb = PartOfSpeech(name="Verb", color_code="#FF0000")
    adjective = PartOfSpeech(name="Adjective", color_code="#8A2BE2")
    article = PartOfSpeech(name="Article", color_code="#FFD700")

    db.session.add_all([noun, verb, adjective, article])
    db.session.commit()
    print("Parts of Speech seeded successfully.")

def undo_parts_of_speech():
    db.session.execute("DELETE FROM parts_of_speech;")
    db.session.commit()
    print("Parts of Speech cleared.")
