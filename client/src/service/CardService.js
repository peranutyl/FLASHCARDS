import axios from 'axios'
const baseUrl = 'http://localhost:8000'

const getAll = () => {
  return axios.get(baseUrl)
}

const createDeck = newObject => {
  console.log(newObject)
  return axios.post(`${baseUrl}/createdeck`, newObject)
}

const getDeck = () => {
  return axios.get(`${baseUrl}/`)
}
const getDecks = () => {
  return axios.get(`${baseUrl}/getdecks`)
}

export default { 
  createDeck,
  getDecks
}