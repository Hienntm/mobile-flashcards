import { AsyncStorage } from 'react-native'

let data = {
    Dog: {
      title: 'Dog',
      cards: [
        {
          question: "Do dogs like flowers?",
          answer: 'correct'
        },
        {
          question: 'Do dogs smoke?',
          answer: 'incorrect'
        }
      ]
    },
    Cat: {
      title: 'Cat',
      cards: [
        {
          question: 'Does your cat hate you?',
          answer: 'incorrect'
        },
        {
          question: 'Do cats fight for fun?',
          answer: 'incorrect'
        }
      ]
    },
    Bird: {
      title: 'Bird',
      cards: [
        {
          question: 'Do parrots understand what they speak?',
          answer: 'correct'
        },
        {
          question: 'Do birds love banana?',
          answer: 'incorrect'
        },
      ]
    }
  }


const STORAGE_KEY = "minhmeo";

export function fetchDecks() {
    return AsyncStorage.getItem(STORAGE_KEY).then(decks => {
      if (decks === null) {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
            return data
        } else {
            return JSON.parse(decks)
        }
    })
}

export function fetchDeck(title) {
    return fetchDecks().then(decks => {
        let mappedDecks = Object.keys(decks).map((key) => (decks[key]))
        return mappedDecks.find(deck => deck.title ===  title)
    }) 
}

export function saveNewDeck(title) {
    const deck = {
        [title]: {
            title: title,
            cards: []
        }
    }
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck))
}

export function saveNewCard(card, title) {
    return AsyncStorage.getItem(STORAGE_KEY, (error, decks) => {
        let parsedDecks = JSON.parse(decks);
        const deck = parsedDecks[title]
        const updatedCards = [
            ...deck.cards,
            card
        ]
        const updatedDeck = JSON.stringify({[title]: {title: title, cards: updatedCards}});
        AsyncStorage.mergeItem(STORAGE_KEY, updatedDeck)
    })
}

export function initializeDecks() {
    return data
}