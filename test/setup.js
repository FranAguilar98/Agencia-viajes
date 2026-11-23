import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { handlers } from '../src/mocks/handlers'

// Servidor MSW para Node: reutiliza los mismos handlers que usa el navegador
const server = setupServer(...handlers)

// Antes de las pruebas se activa el servidor MSW (APIs mock)
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Después de cada prueba se limpia el DOM y se restauran los handlers
afterEach(() => {
    cleanup()
    server.resetHandlers()
})

// Al terminar se cierra el servidor
afterAll(() => server.close())
