import { useState, useEffect } from 'react'
import axios from 'axios'
import CardService from "../service/CardService"

const ReviseDecks = () => {
    const [decks, setDecks] = useState([])


  useEffect(() => {
    console.log('effect')
    CardService.getDecks().then(
        response => {
            setDecks(response.data.map((row) => ({
                DeckID : row[0],
                DeckName : row[1]
            })))
        }
    )
  }, [])
  return(
    <div>
        <ul>
        {decks.map(deck => <li key={deck.DeckID}>{deck.DeckName}</li>)}
        </ul>
    </div>
  )

}

export default ReviseDecks