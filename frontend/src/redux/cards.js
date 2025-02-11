// Action Types
const ADD_CARD = "cards/ADD_CARD";
const EDIT_CARD = "cards/EDIT_CARD";



// Action Creators
export const addCard = (card) => ({
  type: ADD_CARD,
  card,
});

export const editCard = (card) => ({
  type: EDIT_CARD,
  payload: card,
});


// Thunk to Edit Card
export const thunkEditCard = (cardData) => async (dispatch) => {
  const response = await fetch(`/api/cards/${cardData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardData),
  });

  if (response.ok) {
    const updatedCard = await response.json();
    console.log("Updated card from backend:", updatedCard); // Log backend response
    dispatch(editCard(updatedCard));
    return updatedCard;
  } else {
    const errors = await response.json();
    console.error("Backend errors:", errors);
    return { errors };
  }
};


// Thunk to Create Card
// export const thunkCreateCard = (cardData) => async (dispatch) => {
//   const csrfToken = document.cookie.match(/csrf_token=([^;]+)/)?.[1];

//   const response = await fetch("/api/cards", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-CSRFToken": csrfToken,
//     },
//     credentials: "include",
//     body: JSON.stringify(cardData),
//   });

//   if (response.ok) {
//     const newCard = await response.json();
//     dispatch(addCard(newCard));
//     return null; // Indicate success
//   } else {
//     const errorData = await response.json();
//     return errorData;
//   }
// };


export const thunkCreateCard = (cardData) => async (dispatch) => {
  const csrfToken = document.cookie.match(/csrf_token=([^;]+)/)?.[1];

  const response = await fetch("/api/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify(cardData),
  });

  if (response.ok) {
    const newCard = await response.json();
    dispatch(addCard(newCard));
    return { card: newCard }; // Return the new card on success
  } else {
    const errorData = await response.json();
    return { errors: errorData.errors }; // Always return an errors object
  }
};


// Thunk to delete a card
export const thunkDeleteCard = (cardId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/cards/${cardId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch({ type: "DELETE_CARD", payload: cardId });
      return null; // Return null on success
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    console.error("Error deleting card:", error);
    return { error: "Something went wrong. Please try again." };
  }
};

// Initial State
const initialState = {
  cards: [], // Keep cards as an array for simplicity
};

// Reducer
export default function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.card], // Add new card to the array
      };

    case EDIT_CARD:
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.payload.id ? action.payload : card
        ), // Update the card in the array
      };

    default:
      return state;
  }
}
