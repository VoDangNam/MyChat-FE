import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomeUser from './HomeUser.jsx'
import ChatView from './views/ChatView.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/> 
  </StrictMode>,
)
