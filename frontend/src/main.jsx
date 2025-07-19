import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx'
import CaptainContex from './context/CaptainContex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContex>
      <UserContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext>
    </CaptainContex>
  </StrictMode>,
)
