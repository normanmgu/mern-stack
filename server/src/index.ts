import express, { Request, Response } from "express";
import mongoose from "mongoose";
const PORT = 3000;
const app = express();

app.use(express.json());

import Deck from "./models/Deck";

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://flashcardsage:5ViMITxpprLEfPMm@cluster0.wkn5eqc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  });
