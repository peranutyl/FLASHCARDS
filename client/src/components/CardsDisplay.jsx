import {useParams} from 'react-router-dom'
import CardService from '../service/CardService'
import { Box, Card, CardActionArea, CardContent, Typography, IconButton} from '@mui/material'
import { useState, useEffect } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear';
import ReactCardFlip from 'react-card-flip';
const CardsDisplay = () => {
    const [cards, setCards] = useState([])
    const [flashcardOrder, setFlashcardOrder] = useState([])
    const [curCardIndex, setCurCardIndex] = useState(0)
    const [curCard, setCurCard] = useState({})
    const [isFlipped, setIsFlipped] = useState(false)
    const [transition, setTransition] = useState("Neutral")
    const [score, setScore] = useState(0)
    const [buttonStatus, setButtonStatus] = useState(false)
    const hideWhenVisible = { display: transition == "Neutral" ? '' : 'none' }
    const ShowTransition = { display: transition != "Neutral" ? '' : 'none' }
    const id = useParams().id


    useEffect(() => {
    console.log('effect')
    CardService.getCardsByDeckId(id).then(
        response => {
            const recievedCards = response.data.map((row) => ({
                CardID : row[0],
                Front : row[1],
                Back : row[2],
                Priority : row[3]
            }))
            setCards(recievedCards)
            const recievedCardsOrder = recievedCards.map(card => card.CardID)
            setFlashcardOrder(recievedCardsOrder)
            setCurCard(recievedCards.find(card => card.CardID == recievedCardsOrder[curCardIndex]))
        }
    )
    }, [])

    useEffect(() => {
        if (cards.length != 0) {
            setIsFlipped(false)
            setTimeout(()=> 
                {   
                    if (curCardIndex < flashcardOrder.length) {
                        setCurCard(cards.find(card => card.CardID == flashcardOrder[curCardIndex]))
                    } else {
                        setButtonStatus(true)
                        setTransition("Score")
                        CardService.updateCards(cards).then(response => console.log(response))
                        
                    }
                }

                
            , 400)   
        }
    }, [curCardIndex]);

    

    useEffect(() => {
        if (curCard.CardID ) {
            setTransition("Neutral"); 
        }
    }, [curCard]);

    const Leitnermethod = (result) => {
        const updatedPriorityCard = cards.map(card => {
            if (card.CardID == curCard.CardID) {
                if (result = "Success") {
                    return {...card, Priority : Math.min(card.Priority + 1, 5)}
                } else {
                    return {...card, Priority : 0}
                }
            } else {
                return card
            }
        })
        setCards(updatedPriorityCard)
        console.log(updatedPriorityCard)

    }



    return(
        <Box>
            <Box style={hideWhenVisible}>
                <ReactCardFlip  flipDirection="vertical" isFlipped={isFlipped} flipSpeedFrontToBack="0.2" flipSpeedBackToFront="0.2" sx={{display:"flex", height:"300px", margin:'15px'}}>
                    <Card  sx={{display:"flex", height:"500px", margin:'15px'}}>
                    <CardActionArea  onClick={() => setIsFlipped(!isFlipped)} sx={{".MuiTouchRipple-root": {
        display: "none"}}}>
                        <CardContent sx={{display: "flex", justifyContent:"center" ,flexGrow:"1"}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {curCard.Front}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>
                    <Card sx={{display:"flex", height:"500px", margin:'15px'}}>
                        <CardActionArea onClick={() => setIsFlipped(!isFlipped)} sx={{".MuiTouchRipple-root": {
        display: "none"}}}>
                        <CardContent sx={{display: "flex", justifyContent:"center"}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {curCard.Back}
                        </Typography>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                </ReactCardFlip>
                </Box>
            <Box style={ShowTransition}>
            <Card sx={{display:"flex", height:"500px", margin:'15px'}}>
                    <CardActionArea sx={{".MuiTouchRipple-root": {
    display: "none"}}}>
                    <CardContent sx={{display: "flex", justifyContent:"center" }}>
                    <Typography gutterBottom variant="h1" fontWeight='fontWeightMedium' component="div" color={transition =="Success" ? 'green' : transition == "Failure" ? 'red' : "grey"} >
                        {transition =="Success" ? "Bravo" : transition == "Failure" ? "That's a pity" : `You Scored ${score} out of ${flashcardOrder.length}`}
                    </Typography>
                    </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
            <Box sx={{display:"flex" , justifyContent: "center"}}>
                <IconButton  sx={{ color: "red" }} onClick={() => { Leitnermethod("Failure"); setTransition("Failure"); setCurCardIndex(curCardIndex + 1);}} disabled={buttonStatus}>
                        <ClearIcon/>
                </IconButton>
                <IconButton  sx={{ color: "green" }}onClick={() => { Leitnermethod("Success"); setTransition("Success"); setScore(score + 1); setCurCardIndex(curCardIndex + 1)}} disabled={buttonStatus}>
                        <CheckIcon/>
                </IconButton>
                
            </Box>
            
        </Box>
    )
}

export default CardsDisplay