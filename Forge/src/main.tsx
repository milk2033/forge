// src/main.tsx

// ─── Mute “you opened the console” warning from embedded-wallets ───
; (function () {
  const _warn = console.warn.bind(console)
  console.warn = (msg?: any, ...args: any[]) => {
    if (typeof msg === 'string' && msg.includes('You are reading this message')) {
      return
    }
    _warn(msg, ...args)
  }
})()

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PrivyProvider } from '@privy-io/react-auth'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivyProvider appId={import.meta.env.VITE_PRIVY_APP_ID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrivyProvider>
  </StrictMode>
)
