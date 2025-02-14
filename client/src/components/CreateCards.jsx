import { useState } from 'react'
import InputCard from './InputCard'
import AddCard from './AddCard'
import CardService from '../service/CardService'
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
          deck : {DeckName: deck},
          cards : cards
        }
        CardService.createDeck(data).then(response => console.log(response))
        
      }
      

    return (
        <div>
            <input onChange={(event) => {setDeck(event.target.value)}}></input>
            {cards.map(card => <InputCard key={card.CardID} handleChange = {handleChange} handleDeleteCard={() => handleDeleteCard(card.CardID)} cardID={card.CardID}></InputCard>)}
            <AddCard handleAddCard={handleAddCard}></AddCard>
            <button onClick={createDeck}>Create Deck</button>
        </div>
      );

}

export default CreateCards
