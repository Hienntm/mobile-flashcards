import { ADD_DECK, RECEIVE_DECKS, ADD_CARD, RESET_DECKS } from '../actions'
import { combineReducers } from 'redux';

function decks(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return (() => {
        const { title } = action.deck
        console.log(action)
        return {
          ...state,
          [title]: {
            title,
            cards: []
          }
        }
      })()
    case RECEIVE_DECKS:
      return action.decks
    case ADD_CARD :
      return (() => {
        const {title, card} = action;
        const deck = state[title];
        const updatedDeck = {
          ...deck,
          cards: [
            ...deck.cards,
            card
          ]
        }        
        return {
          ...state,
          [title]: updatedDeck,
        }
      })()

    case RESET_DECKS: 
      return action.decks
    default :
      return state
  }
}

export default combineReducers({ decks });