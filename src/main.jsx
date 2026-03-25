import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'

import 'lenis/dist/lenis.css'

// Import all legacy CSS styles
import './styles/styles.css'
import './styles/premium.css'
import './styles/about.css'
import './styles/blog.css'
import './styles/auth.css'
import './styles/dashboard.css'
import './styles/home-magical.css'
import './styles/components.css'
import './styles/book-layouts.css'

const routerBasename =
  import.meta.env.BASE_URL === '/'
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, '')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename}>
      <SmoothScroll />
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
