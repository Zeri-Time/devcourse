import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Apitest from './Apitest.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Apitest />
  </StrictMode>
)
