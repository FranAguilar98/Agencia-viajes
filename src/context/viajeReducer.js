// Reducer del viaje: concentra todas las reglas que cambian el estado.
// El estado guarda las líneas elegidas por el usuario:
//   items: [{ clave, tipo, destino, nombre, detalle, precio, disponibles, cantidad }]
//   - precio:      valor de una unidad (un asiento o una habitación completa)
//   - disponibles: cupos totales que informó la API (asientos o habitaciones)
//   - cantidad:    cuántas unidades lleva el usuario
// Los cupos que quedan se calculan así: disponibles - cantidad.

export const estadoInicial = { items: [] }

export function viajeReducer(estado, accion) {
    switch (accion.type) {
        // Agrega una unidad: si la línea ya existe suma 1, si no la crea.
        // No deja pasar de los cupos disponibles.
        case 'AGREGAR_ITEM': {
            const { item } = accion
            const existente = estado.items.find((i) => i.clave === item.clave)

            if (!existente) {
                if (item.disponibles <= 0) return estado // sin cupos
                return { items: [...estado.items, { ...item, cantidad: 1 }] }
            }

            if (existente.cantidad >= existente.disponibles) return estado // sin cupos

            return {
                items: estado.items.map((i) =>
                    i.clave === item.clave ? { ...i, cantidad: i.cantidad + 1 } : i
                )
            }
        }

        // Quita una unidad (devuelve un cupo). Si llega a 0, la línea sale del viaje.
        case 'QUITAR_UNIDAD': {
            const linea = estado.items.find((i) => i.clave === accion.clave)
            if (!linea) return estado

            if (linea.cantidad <= 1) {
                return { items: estado.items.filter((i) => i.clave !== accion.clave) }
            }

            return {
                items: estado.items.map((i) =>
                    i.clave === accion.clave ? { ...i, cantidad: i.cantidad - 1 } : i
                )
            }
        }

        // Quita la línea completa (devuelve todos sus cupos)
        case 'QUITAR_ITEM':
            return { items: estado.items.filter((i) => i.clave !== accion.clave) }

        // Vacía el viaje: todos los cupos vuelven a estar disponibles
        case 'VACIAR_VIAJE':
            return estadoInicial

        default:
            return estado
    }
}
