import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import "./App.css";

type TDeck = {
  title: string,
  _id: string
}

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState<string>("");

  const handleCreateDeck = async (e: React.FormEvent) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:3000/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const deck = await response.json();
    setDecks([...decks, deck]);
    setTitle("");
  }

  const handleDeckDelete = async (deckId: string) =>{
    deleteDeck(deckId);
    setDecks(decks.filter(deck => deck._id !== deckId));
  }

  useEffect(() =>{
    (async () =>{
      const response = await fetch("http://localhost:3000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    })()
  },[])

  return (
    <div className="App">
      <div className="decks">
        {
          decks.map(deck => {
            return (
            <li key={deck._id}>
              <button onClick={() => handleDeckDelete(deck._id)}>X</button>
              <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
            </li>
            )
          })
        }
      </div>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
