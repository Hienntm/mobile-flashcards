import { AsyncStorage } from 'react-native'
import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar'

export function fetchCalendarResults () {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults)
}

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function removeEntry (key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
    })
}

export function getDecks() {
    return AsyncStorage.getAllKeys().then(formatDeckList)
}

export function getDeck(id) {
    return AsyncStorage.getItems(id).then(formatDeck)
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(title, JSON.stringify({
        [card]: card
      }))    
}

export function addCardToDeck(title, card) {
    return AsyncStorage.setItem(title, JSON.stringify({
        [card]: card
      })) 
}