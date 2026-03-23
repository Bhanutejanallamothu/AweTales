import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Import all legacy CSS styles
import './styles/styles.css'
import './styles/premium.css'
import './styles/about.css'
import './styles/blog.css'
import './styles/auth.css'
import './styles/dashboard.css'
import './styles/hero.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
