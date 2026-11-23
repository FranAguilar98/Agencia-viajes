import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Service Worker de MSW: intercepta las peticiones en el navegador
export const worker = setupWorker(...handlers)
