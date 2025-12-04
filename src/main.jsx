import React from 'react'
import ReactDOM from 'react-dom/client'
import PortfolioDante from './PortfolioDante.jsx'
import './index.css'
const redirectPath = sessionStorage.getItem('redirect')

if (redirectPath) {
  sessionStorage.removeItem('redirect')

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
  const normalizedRedirect = redirectPath.startsWith('/')
    ? redirectPath.slice(1)
    : redirectPath
  const targetUrl = `${basePath}/${normalizedRedirect}`

  window.history.replaceState(null, '', targetUrl)
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PortfolioDante />
  </React.StrictMode>
)

