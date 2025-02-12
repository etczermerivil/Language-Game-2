from backend.models import db, User, Language, PartOfSpeech, Word
import csv
import os

# Seed Users
def seed_users():
    user1 = User(username="DemoUser", email="demo@aa.io", password="password")
    user2 = User(username="TestUser", email="test@aa.io", password="password")
    db.session.add_all([user1, user2])
    db.session.commit()
    print("Users seeded successfully.")

def undo_users():
    db.session.execute("DELETE FROM users;")
    db.session.commit()
    print("Users cleared.")

# Seed Languages
def seed_languages():
    english = Language(name="English", code="en")
    db.session.add(english)
    db.session.commit()
    print("Languages seeded successfully.")

def undo_languages():
    db.session.execute("DELETE FROM languages;")
    db.session.commit()
    print("Languages cleared.")

# Seed Parts of Speech
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

# Seed Words
def seed_words():
    # Always use an absolute path relative to this file's location
    csv_file = os.path.join(os.path.dirname(__file__), "New_Seed_Data.csv")
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)

        for row in reader:
            # Find the associated PartOfSpeech and Language
            part_of_speech = PartOfSpeech.query.filter_by(name=row['part_of_speech']).first()
            language = Language.query.filter_by(code=row['language_code']).first()

            if part_of_speech and language:
                # Create a new Word object with the updated fields
                word = Word(
                    word_text=row['word'],
                    part_of_speech_id=part_of_speech.id,
                    language_id=language.id,
                    ipa=row.get('ipa'),
                    lemma=row.get('lemma'),
                    image_url=row.get('image_url'),
                    card_count=row.get('card_count', 1),
                    pronunciation=row.get('pronunciation'),
                    definition=row.get('definition'),
                    example_sentence=row.get('example_sentence'),
                    example_translation=row.get('example_translation')
                )
                db.session.add(word)

        db.session.commit()
        print("Words seeded successfully.")

def undo_words():
    db.session.execute("DELETE FROM words;")
    db.session.commit()
    print("Words table cleared.")
