import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import ViajeProvider from './context/ViajeProvider'
import { worker } from './mocks/browser'
import './index.css'
import './tailwind.css'

// Primero se activa MSW (APIs mock REST y GraphQL) y luego se dibuja la aplicación.
// Se usa HashRouter porque GitHub Pages es un alojamiento estático: las rutas
// quedan después del "#" y recargar la página no da error 404.
async function iniciar() {
    await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` }
    })

    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <HashRouter>
                <ViajeProvider>
                    <App />
                </ViajeProvider>
            </HashRouter>
        </StrictMode>
    )
}

iniciar()