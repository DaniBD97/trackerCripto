import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CriptoProvider } from './Context/CriptoProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CriptoProvider>

    <App />
  </CriptoProvider>


)
