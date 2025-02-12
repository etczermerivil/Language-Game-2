from .db import db, environment, SCHEMA, add_prefix_for_prod

class PartOfSpeech(db.Model):
    __tablename__ = 'parts_of_speech'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)  # e.g., Noun, Verb
    color_code = db.Column(db.String(10), nullable=False)  # Hex color, e.g., "#FF0000"

    # ✅ FIXED: Added explicit schema-aware relationship
    words = db.relationship(
        'Word',
        back_populates='part_of_speech',
        cascade='all, delete-orphan',
        primaryjoin=f"{add_prefix_for_prod('PartOfSpeech.id')} == {add_prefix_for_prod('Word.part_of_speech_id')}"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'color_code': self.color_code
        }
