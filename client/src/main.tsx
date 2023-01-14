import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Deck from "./components/deck/deck"
import './index.css'
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/decks/:deckId",
    element: <Deck /> 
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
