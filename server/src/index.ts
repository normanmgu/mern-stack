import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
config();
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: "*"
}));

import Deck from "./models/Deck";

app.get("/decks", async (req: Request, res: Response) =>{
  const decks = await Deck.find();
  console.log(decks);
  res.json(decks);
})

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.delete("/decks/:deckId", async (req: Request, res: Response) =>{
  const deckId = req.params.deckId;
  const deck = await Deck.findByIdAndDelete(deckId);
  res.json(deck);
})

console.log(process.env.MONGO_URL)

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://flashcardsage:zoX581LPlGKiPrLT@cluster0.wkn5eqc.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    app.listen(PORT, () => {
      console.info(`Listening on port ${PORT}`);
    });
  });
