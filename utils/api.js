import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo';

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
const NOTIFICATION_KEY = "minh";

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
        let mappedDecks = Object.STORAGE_KEYs(decks).map((STORAGE_KEY) => (decks[STORAGE_KEY]))
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

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

function createNotification() {
  return {
    title: 'Hey there',
    body: "Let's do some QUIZ!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}