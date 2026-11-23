import { useReducer, useMemo } from 'react'
import { ViajeContext } from './ViajeContext'
import { viajeReducer, estadoInicial } from './viajeReducer'

// Proveedor: entrega las líneas del viaje, los totales y las acciones para modificarlas
function ViajeProvider({ children }) {
    const [estado, dispatch] = useReducer(viajeReducer, estadoInicial)

    const valor = useMemo(() => {
        // Total en pesos: precio de cada unidad por la cantidad elegida
        const total = estado.items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

        // Total de unidades (asientos y habitaciones) que lleva el usuario
        const cantidadTotal = estado.items.reduce((suma, item) => suma + item.cantidad, 0)

        return {
            items: estado.items,
            total,
            cantidadTotal,
            agregar: (item) => dispatch({ type: 'AGREGAR_ITEM', item }),
            quitarUnidad: (clave) => dispatch({ type: 'QUITAR_UNIDAD', clave }),
            quitar: (clave) => dispatch({ type: 'QUITAR_ITEM', clave }),
            vaciar: () => dispatch({ type: 'VACIAR_VIAJE' }),
            // Cuántas unidades de esa clave lleva el usuario (0 si ninguna)
            cantidadDe: (clave) => estado.items.find((i) => i.clave === clave)?.cantidad ?? 0
        }
    }, [estado])

    return <ViajeContext.Provider value={valor}>{children}</ViajeContext.Provider>
}

export default ViajeProvider
