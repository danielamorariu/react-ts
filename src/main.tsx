import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter } from "react-router-dom"
import { BudgetsProvider } from "./context/BudgetsContext"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <BudgetsProvider>
            <App />
          </BudgetsProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
