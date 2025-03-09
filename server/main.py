from fastapi import FastAPI, Body, HTTPException
from pydantic import BaseModel
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware
from datetime import date, datetime
from typing import Optional, Annotated, List
from fastapi.responses import JSONResponse
import os


os.environ


class Deck(BaseModel):
    DeckID: int 
    DeckName : str
    Created : Optional[datetime] = None
    Updated : Optional[datetime] = None

class Card(BaseModel):
    CardID : int
    Front : str
    Back : str
    Priority : Optional[int] = None
    Created : Optional[datetime] = None
    Updated : Optional[datetime] = None
    DeckID : Optional[int] = None


app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Connect to the database
mydb = mysql.connector.connect(

)

# Create a cursor object
cursor = mydb.cursor()


@app.get("/getdecks")
def select_cards():
    cursor = mydb.cursor()
    cursor.execute("SELECT * FROM Decks")
    results = cursor.fetchall()
    cursor.close()
    return results

@app.get("/Decks/{DeckID}/Cards")
def get_cards_by_deck_id(DeckID: int):
    cursor = mydb.cursor()
    cursor.execute("SELECT * FROM Cards WHERE DeckID = (%s)", (DeckID,))
    results = cursor.fetchall()
    cursor.close()
    return results

@app.post("/createdeck/")
async def create_deck(deck: Annotated[str, Body()], cards: List[Card]):
    cursor.execute("INSERT INTO Decks (DeckName) VALUES (%s)", (deck,))
    mydb.commit()
    DeckID = cursor.lastrowid   
    cursor.executemany("INSERT INTO Cards (Front, Back, DeckID) VALUES (%s, %s, %s)", [(card.Front, card.Back, DeckID) for card in cards ])
    mydb.commit()
    return deck

@app.delete("/deletedeck/{DeckID}")
def delete_deck(DeckID: int):
    cursor = mydb.cursor()
    print(DeckID)
    try:
        print('deleting')
        cursor.execute("DELETE FROM Decks WHERE DeckID = (%s)", (DeckID,))
        mydb.commit()
    except:
        raise HTTPException(status_code=409, detail="Cannot delete directory. It is either not empty or access is not allowed")
    return {"message" : "successfully deleted"}

@app.put("/updatecards")
def update_cards(cards: List[Card]):
    print("hello")
    for card in cards:
        print(card.Priority)
    cursor.executemany("UPDATE CARDS SET Priority = (%s) WHERE CardID = (%s)", [(card.Priority, card.CardID) for card in cards])
    mydb.commit()
    return cards