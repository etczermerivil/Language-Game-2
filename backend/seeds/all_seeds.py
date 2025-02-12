# backend/seeds/all_seeds.py

import os
import csv
from flask.cli import AppGroup
from backend.models import db, User, Language, PartOfSpeech, Word
from backend.config import environment, SCHEMA

# Create an AppGroup named "seed".
# `flask seed --help` will list subcommands like "all" and "undo".
seed_commands = AppGroup('seed')

# ---------- SEED FUNCTIONS ---------- #

@seed_commands.command('all')
def seed_all():
    """
    Seeds all tables in correct order.
    If in production, first run 'undo_all' to clear old data.
    """
    if environment == 'production':
        undo_all()

    seed_users()
    seed_languages()
    seed_parts_of_speech()
    seed_words()
    print("Seeding completed successfully.")

def seed_users():
    user1 = User(username="DemoUser", email="demo@aa.io", password="password")
    user2 = User(username="TestUser", email="test@aa.io", password="password")
    db.session.add_all([user1, user2])
    db.session.commit()
    print("Users seeded.")

def seed_languages():
    english = Language(name="English", code="en")
    # Add more languages if needed
    db.session.add(english)
    db.session.commit()
    print("Languages seeded.")

def seed_parts_of_speech():
    noun = PartOfSpeech(name="Noun", color_code="#1E90FF")
    verb = PartOfSpeech(name="Verb", color_code="#FF0000")
    db.session.add_all([noun, verb])
    db.session.commit()
    print("Parts of Speech seeded.")

def seed_words():
    # Adjust CSV name/path if needed
    csv_file = os.path.join(os.path.dirname(__file__), "New_Seed_Data.csv")
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # Find the associated PartOfSpeech and Language
            part_of_speech = PartOfSpeech.query.filter_by(name=row['part_of_speech']).first()
            language = Language.query.filter_by(code=row['language_code']).first()

            if part_of_speech and language:
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
    print("Words seeded from CSV.")


# ---------- UNDO FUNCTIONS ---------- #

@seed_commands.command('undo')
def undo_all():
    """
    Undo/clear all tables in reverse order (words first, etc.).
    Production uses TRUNCATE schema.table.
    Dev uses DELETE FROM table.
    """
    undo_words()
    undo_parts_of_speech()
    undo_languages()
    undo_users()
    print("All tables cleared.")


def undo_words():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.words RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM words;")
    db.session.commit()
    print("Words table cleared.")

def undo_parts_of_speech():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.parts_of_speech RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM parts_of_speech;")
    db.session.commit()
    print("Parts of Speech cleared.")

def undo_languages():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.languages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM languages;")
    db.session.commit()
    print("Languages cleared.")

def undo_users():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users;")
    db.session.commit()
    print("Users table cleared.")
