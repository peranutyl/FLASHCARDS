import { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import CardService from "../service/CardService"
import { Box, Card, CardActionArea, CardContent, Typography} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
    
  },[])

  const handleDeleteDeck= (id) => {
    CardService.deleteDeck(id)
    setDecks(decks.filter(deck => deck.DeckID != id))
  }

  return(
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gridAutoRows="150px" gap="20px">
        {decks.map(deck => 
          <Card style={{gridColumn: "span 1" , display:"flex"}} key={deck.DeckID}>
              <CardActionArea component={Link} to={`/revise/${deck.DeckID}`}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {deck.DeckName}
                  </Typography>
                </CardContent>
            </CardActionArea>
            <IconButton sx={{gridColumn:"span 1"}} aria-label="delete" onClick={() => handleDeleteDeck(deck.DeckID)}>
                        <DeleteOutlineIcon />
            </IconButton>
          </Card>)}
    </Box>   
  )

}

export default ReviseDecks