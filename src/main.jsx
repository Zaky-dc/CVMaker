import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Polyfill moved to MainLayout.jsx for lazy loading


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
