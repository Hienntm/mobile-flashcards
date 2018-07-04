export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const REMOVE_DECKS = 'REMOVE_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const RESET_DECKS = 'RESET_DECKS'

export function addDeck ({title}) {
  return {
    type: ADD_DECK,
    deck: {
      title,
    }
  }
}

export function receiveDecks ({decks}) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addCard ({card, title}) {
  return {
    type: ADD_CARD,
    card,
    title
  }
}

export function resetDecks ({decks}) {
  return {
    type: RESET_DECKS,
    decks
  }
}