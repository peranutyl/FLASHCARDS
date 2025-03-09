import { useState } from 'react'
import InputCard from './InputCard'
import AddCard from './AddCard'
import CardService from '../service/CardService'
import { Box } from '@mui/material'
// Creates three empty cards bhy default
const CreateCards = () => {
    const startcards = [

      ]
      const [deck, setDeck] = useState("")
      const [cards, setCards] = useState([{
        "CardID": 1,
        "Front": "",
        "Back": "",
      },
      {
        "CardID": 2,
        "Front": "",
        "Back": "",
      },
       {
        "CardID": 3,
        "Front": "",
        "Back": "",
       }])
      const handleChange = (event, id, side) => {
        const updatedCards = cards.map(card => card.CardID === id ? {...card, [side]: event.target.value} : card)
        setCards(updatedCards)
      }
      const handleAddCard = () => {
        const newID = Object.keys(cards).length != 0 ? Math.max(...cards.map(card => card.CardID)) + 1 : 1
        setCards(cards.concat({CardID: newID, Front: "", Back: ""}))
      }
    
      const handleDeleteCard = (id) => {
        const updatedCards = cards.filter(card => card.CardID != id)
        setCards(updatedCards)
      }

      const createDeck = () => {
        const data = {
          deck : deck,
          cards : cards
        }
        CardService.createDeck(data).then(response => console.log(response))
        
      }
      

    return (
      //things seem very Boxy
        <Box display = "flex" flexDirection="column" gap ="20px">
          <Box>
              <input onChange={(event) => {setDeck(event.target.value)}}></input>
          </Box>
            {cards.map(card => 
            <InputCard key={card.CardID} handleChange = {handleChange} handleDeleteCard={() => handleDeleteCard(card.CardID)} cardID={card.CardID}></InputCard>
            )}
          <Box>
            <AddCard handleAddCard={handleAddCard}></AddCard>
          </Box>   
          <Box>
            <button onClick={createDeck}>Create Deck</button>
          </Box>   
        </Box>

      );

}

export default CreateCards
