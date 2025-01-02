import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from '@/components/ui/provider.tsx'
import AppRoutes from './routes/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <AppRoutes />
    </Provider>
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
