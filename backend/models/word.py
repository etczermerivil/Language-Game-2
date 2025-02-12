from .db import db, environment, SCHEMA, add_prefix_for_prod

class Word(db.Model):
    __tablename__ = 'words'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    word_text = db.Column(db.String(100), nullable=False)
    part_of_speech_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("parts_of_speech.id")), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("languages.id")), nullable=False)
    ipa = db.Column(db.String(100), nullable=True)
    lemma = db.Column(db.String(100), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    card_count = db.Column(db.Integer, nullable=False, default=1)

    # ✅ FIXED: Ensure schema-aware relationships
    part_of_speech = db.relationship('PartOfSpeech', back_populates='words')
    language = db.relationship('Language', back_populates='words')


    decks = db.relationship(
        "Deck",
        back_populates="words"
    )

    pronunciation = db.Column(db.String(100), nullable=True)  # Optional field for romanized pronunciation
    definition = db.Column(db.String(255), nullable=False)  # Word meaning/translation
    example_sentence = db.Column(db.Text, nullable=True)  # Contextual example
    example_translation = db.Column(db.Text, nullable=True)  # Translation of the example sentence

    def to_dict(self):
        return {
            'id': self.id,
            'word_text': self.word_text,
            'part_of_speech': self.part_of_speech.name,
            'language': self.language.name,
            'ipa': self.ipa,
            'lemma': self.lemma,
            'image_url': self.image_url,
            'card_count': self.card_count,
            'pronunciation': self.pronunciation,
            'definition': self.definition,
            'example_sentence': self.example_sentence,
            'example_translation': self.example_translation
        }
