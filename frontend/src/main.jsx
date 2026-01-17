/**
 * Main entry point for the Chessfull React application.
 * Initializes the React root and renders the App component wrapped in StrictMode.
 * StrictMode helps identify potential issues in the application during development.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> 
  </StrictMode>,
)
