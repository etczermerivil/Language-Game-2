import { useEffect, useState } from 'react';
import axios from 'axios';

const DecksPage = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/decks'); // Your backend API
        setDecks(response.data);
      } catch (error) {
        console.error('Error fetching decks:', error);
      }
    };

    fetchDecks();
  }, []);

  return (
    <div>
      <h1>Your Decks</h1>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>{deck.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DecksPage;
