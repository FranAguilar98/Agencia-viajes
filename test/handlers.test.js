// @vitest-environment node
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { obtenerDestinos, obtenerDestino, obtenerOpciones } from '../src/util/api'

const ORIGEN = 'http://localhost:3000'

beforeAll(() => {
    vi.stubGlobal('location', new URL(ORIGEN))

    const fetchNode = globalThis.fetch

    vi.stubGlobal('fetch', (entrada, opciones) => {
        const url = typeof entrada === 'string' && entrada.startsWith('/') ? ORIGEN + entrada : entrada
        return fetchNode(url, opciones)
    })
})

// Pruebas de los handlers MSW: API REST mock y API GraphQL mock.
// Usan las mismas funciones que la aplicación (src/util/api.js).
describe('API REST mock de destinos', () => {
    it('lista los cuatro destinos pedidos', async () => {
        const destinos = await obtenerDestinos()

        expect(destinos).toHaveLength(4)
        expect(destinos.map((d) => d.ciudad)).toEqual([
            'Osaka',
            'Río de Janeiro',
            'Madrid',
            'Ciudad de México'
        ])
    })

    it('cada destino incluye país', async () => {
    const destinos = await obtenerDestinos()

    for (const destino of destinos) {
        expect(destino.pais).toBeTruthy()
    }
})

    it('devuelve un destino por id y null si no existe', async () => {
        const osaka = await obtenerDestino('osaka')
        const inexistente = await obtenerDestino('narnia')

        expect(osaka.pais).toBe('Japón')
        expect(inexistente).toBeNull()
    })
})

describe('API GraphQL mock de vuelos y hoteles', () => {
    it('entrega vuelos con precio, fechas y disponibilidad', async () => {
        const opciones = await obtenerOpciones('madrid')

        expect(opciones.vuelos.length).toBeGreaterThan(0)
        const vuelo = opciones.vuelos[0]
        expect(vuelo).toHaveProperty('precio')
        expect(vuelo).toHaveProperty('salida')
        expect(vuelo).toHaveProperty('llegada')
        expect(vuelo).toHaveProperty('asientosDisponibles')
    })

    it('entrega hoteles con precio por noche, fechas y disponibilidad', async () => {
        const opciones = await obtenerOpciones('rio')

        expect(opciones.hoteles.length).toBeGreaterThan(0)
        const hotel = opciones.hoteles[0]
        expect(hotel).toHaveProperty('precioNoche')
        expect(hotel).toHaveProperty('desde')
        expect(hotel).toHaveProperty('hasta')
        expect(hotel).toHaveProperty('habitacionesDisponibles')
    })

    it('devuelve null para un destino que no existe', async () => {
        const opciones = await obtenerOpciones('narnia')

        expect(opciones).toBeNull()
    })
})
