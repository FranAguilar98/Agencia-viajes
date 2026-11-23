import { describe, it, expect } from 'vitest'
import { viajeReducer, estadoInicial } from '../src/context/viajeReducer'

// Un vuelo con 2 asientos y un hotel con 1 habitación, como los entregaría la API
const vuelo = { clave: 'vuelo-v-osa-1', tipo: 'Vuelo', destino: 'Osaka', nombre: 'Pacífico Air', detalle: '', precio: 1450000, disponibles: 2 }
const hotel = { clave: 'hotel-h-osa-1', tipo: 'Hotel', destino: 'Osaka', nombre: 'Hotel Namba Central', detalle: '', precio: 475000, disponibles: 1 }

// Pruebas del viaje: agregar, descontar cupos y quitar
describe('viajeReducer', () => {
    it('agrega un vuelo y un hotel con cantidad 1', () => {
        let estado = viajeReducer(estadoInicial, { type: 'AGREGAR_ITEM', item: vuelo })
        estado = viajeReducer(estado, { type: 'AGREGAR_ITEM', item: hotel })

        expect(estado.items).toHaveLength(2)
        expect(estado.items.every((i) => i.cantidad === 1)).toBe(true)
    })

    it('sumar el mismo vuelo aumenta la cantidad en vez de duplicar la línea', () => {
        let estado = viajeReducer(estadoInicial, { type: 'AGREGAR_ITEM', item: vuelo })
        estado = viajeReducer(estado, { type: 'AGREGAR_ITEM', item: vuelo })

        expect(estado.items).toHaveLength(1)
        expect(estado.items[0].cantidad).toBe(2)
    })

    it('no deja pasar de los cupos disponibles', () => {
        let estado = viajeReducer(estadoInicial, { type: 'AGREGAR_ITEM', item: hotel })
        estado = viajeReducer(estado, { type: 'AGREGAR_ITEM', item: hotel })

        expect(estado.items[0].cantidad).toBe(1)
    })

    it('no agrega algo que ya no tiene cupos', () => {
        const estado = viajeReducer(estadoInicial, {
            type: 'AGREGAR_ITEM',
            item: { ...vuelo, disponibles: 0 }
        })

        expect(estado.items).toHaveLength(0)
    })

    it('quitar una unidad devuelve un cupo y al llegar a 0 sale la línea', () => {
        let estado = viajeReducer(estadoInicial, { type: 'AGREGAR_ITEM', item: vuelo })
        estado = viajeReducer(estado, { type: 'AGREGAR_ITEM', item: vuelo })

        estado = viajeReducer(estado, { type: 'QUITAR_UNIDAD', clave: vuelo.clave })
        expect(estado.items[0].cantidad).toBe(1)

        estado = viajeReducer(estado, { type: 'QUITAR_UNIDAD', clave: vuelo.clave })
        expect(estado.items).toHaveLength(0)
    })

    it('quita una línea completa por su clave', () => {
        let estado = viajeReducer(estadoInicial, { type: 'AGREGAR_ITEM', item: vuelo })
        estado = viajeReducer(estado, { type: 'AGREGAR_ITEM', item: vuelo })
        estado = viajeReducer(estado, { type: 'AGREGAR_ITEM', item: hotel })
        estado = viajeReducer(estado, { type: 'QUITAR_ITEM', clave: vuelo.clave })

        expect(estado.items).toHaveLength(1)
        expect(estado.items[0].clave).toBe(hotel.clave)
    })

    it('vacía el viaje', () => {
        let estado = viajeReducer(estadoInicial, { type: 'AGREGAR_ITEM', item: vuelo })
        estado = viajeReducer(estado, { type: 'VACIAR_VIAJE' })

        expect(estado.items).toHaveLength(0)
    })
})
