from flask import Blueprint, request, jsonify
from backend.models import db, Deck, User
from flask_login import login_required

deck_routes = Blueprint('decks', __name__)

# GET all decks
@deck_routes.route('/', methods=['GET'])
def get_all_decks():
    decks = Deck.query.all()

    if decks:
        return jsonify([deck.to_dict() for deck in decks]), 200
    else:
        return jsonify([]), 200

# GET a single deck by ID
@deck_routes.route('/<int:deck_id>', methods=['GET'])
def get_deck(deck_id):
    deck = Deck.query.get(deck_id)
    if not deck:
        return jsonify({'error': 'Deck not found'}), 404
    return jsonify(deck.to_dict()), 200

# POST: Create a new deck
@deck_routes.route('/', methods=['POST'])
@login_required

def create_deck():
    data = request.get_json()

    # Check if required fields are missing
    if not data.get("name"):
        return jsonify({"error": "Missing required field: name"}), 400
    if not data.get("user_id"):
        return jsonify({"error": "Missing required field: user_id"}), 400

    # Check if the user exists
    user = User.query.get(data["user_id"])
    if not user:
        return jsonify({"error": "User not found with the provided user_id."}), 400

    # Check if a deck with the same name already exists for the same user
    existing_deck = Deck.query.filter_by(name=data["name"], user_id=data["user_id"]).first()
    if existing_deck:
        return jsonify({"error": "Deck with this name already exists for the user."}), 409

    new_deck = Deck(
        name=data['name'],
        user_id=data['user_id']
    )
    db.session.add(new_deck)
    db.session.commit()
    return jsonify(new_deck.to_dict()), 201

# PUT: Update an existing deck
@deck_routes.route('/<int:deck_id>', methods=['PUT'])
@login_required

def update_deck(deck_id):
    deck = Deck.query.get(deck_id)
    if not deck:
        return jsonify({'error': 'Deck not found'}), 404
    data = request.get_json()
    deck.name = data.get('name', deck.name)
    db.session.commit()
    return jsonify(deck.to_dict()), 200

# DELETE: Remove a deck
@deck_routes.route('/<int:deck_id>', methods=['DELETE'])
@login_required

def delete_deck(deck_id):
    deck = Deck.query.get(deck_id)
    if not deck:
        return jsonify({'error': 'Deck not found'}), 404
    db.session.delete(deck)
    db.session.commit()
    return jsonify({'message': 'Deck deleted successfully'}), 200
