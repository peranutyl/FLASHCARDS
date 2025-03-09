import axios from 'axios'
const baseUrl = 'http://localhost:8000'

const getAll = () => {
  return axios.get(baseUrl)
}

const createDeck = newDeck => {
  console.log(newDeck)
  return axios.post(`${baseUrl}/createdeck`, newDeck)
}

const getDecks = () => {
  return axios.get(`${baseUrl}/getdecks`)
}

const getCardsByDeckId= (DeckID) => {
  return axios.get(`${baseUrl}/Decks/${DeckID}/Cards`)
}

const deleteDeck = (DeckID) => {
  return axios.delete(`${baseUrl}/deletedeck/${DeckID}`)
}

const updateCards = cards => {
  console.log(cards)
  return axios.put(`${baseUrl}/updatecards`, cards)
}
export default { 
  createDeck,
  getDecks,
  getCardsByDeckId,
  deleteDeck,
  updateCards
}