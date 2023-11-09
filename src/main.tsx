import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MediatoolThemeProvider } from '@northlight/ui'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MediatoolThemeProvider>
      <App />
    </MediatoolThemeProvider>
  </React.StrictMode>
)
