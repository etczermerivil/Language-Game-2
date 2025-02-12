from .db import db, environment, SCHEMA, add_prefix_for_prod

class Language(db.Model):
    __tablename__ = 'languages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)  # English, Spanish, etc.
    code = db.Column(db.String(10), nullable=False, unique=True)  # "en", "es", etc.

    # Relationships
    words = db.relationship('Word', back_populates='language', cascade='all, delete-orphan')
    patterns = db.relationship('LanguagePattern', back_populates='language', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code
        }
