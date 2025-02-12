# from flask.cli import AppGroup
# from .users import seed_users, undo_users
# from .languages import seed_languages, undo_languages
# from .parts_of_speech import seed_parts_of_speech, undo_parts_of_speech
# from .words import seed_words, undo_words
# from .decks import seed_decks, undo_decks
# from backend.models.db import db, environment, SCHEMA



# seed_commands = AppGroup('seed')



# @seed_commands.command('all')
# def seed():
#     if environment == 'production':
#         undo_users()
#         undo_languages()
#         undo_parts_of_speech()
#         undo_words()
#         undo_decks()

#     seed_users()
#     db.session.commit()

#     seed_languages()
#     db.session.commit()

#     seed_parts_of_speech()
#     db.session.commit()

#     seed_words()
#     db.session.commit()

#     seed_decks()
#     db.session.commit()

#     print("Seeding completed successfully.")


# @seed_commands.command('undo')
# def undo():
#     undo_decks()
#     db.session.commit()

#     undo_words()
#     db.session.commit()

#     undo_parts_of_speech()
#     db.session.commit()

#     undo_languages()
#     db.session.commit()

#     undo_users()
#     db.session.commit()

#     print("All tables cleared successfully.")
