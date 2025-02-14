from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware
from datetime import date, datetime
from typing import Optional, List
import os

os.environ


class Deck(BaseModel):
    DeckID: int = None
    DeckName : str
    Created : Optional[datetime] = None
    Updated : Optional[datetime] = None

class Card(BaseModel):
    CardID : int
    Front : str
    Back : str
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
    host= os.environ['DATABASELOCALHOST'],
    user= os.environ['DATABASEUSER'],
    database= os.environ['DATABASE'],
    password= os.environ['DATABASEPASS'],
)

# Create a cursor object
cursor = mydb.cursor()



@app.get("/getdecks")
def select_cards():
    cursor = mydb.cursor()
    cursor.execute("SELECT * FROM Decks")
    results = cursor.fetchall()
    print(results)
    cursor.close()
    return results


@app.post("/createdeck/")
async def create_deck(deck: Deck, cards: List[Card]):
    cursor.execute("INSERT INTO Decks (DeckName) VALUES (%s)", (deck.DeckName,))
    mydb.commit()
    DeckID = cursor.lastrowid
    print(DeckID)
    cursor.executemany("INSERT INTO Cards (Front, Back, DeckID) VALUES (%s, %s, %s)", [(card.Front, card.Back, DeckID) for card in cards ])
    mydb.commit()
    return deck