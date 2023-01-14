import {API_URL} from "./config";

export const deleteDeck = async (deckId: string) =>{
  const response = await fetch(`${API_URL}/decks/${deckId}`, {
    method: "DELETE",
  });
  return response.json();
}