// Funciones de acceso a las APIs mock (REST y GraphQL).
// Todas reciben un "signal" para poder cancelar la petición al desmontar el componente.

// Consulta GraphQL: vuelos y hoteles de un destino
export const OPCIONES_VIAJE = `
    query OpcionesViaje($destinoId: String!) {
        opcionesViaje(destinoId: $destinoId) {
            vuelos {
                id
                aerolinea
                origen
                salida
                llegada
                precio
                asientosDisponibles
            }
            hoteles {
                id
                nombre
                estrellas
                precioNoche
                noches
                desde
                hasta
                habitacionesDisponibles
            }
        }
    }
`

async function leerJson(respuesta) {
    const tipo = respuesta.headers.get('content-type') || ''

    if (!tipo.includes('json')) {
        throw new Error(
            'Las APIs mock no están activas. Revisa que exista public/mockServiceWorker.js y borra el service worker antiguo (F12, Application, Service Workers, Unregister).'
        )
    }

    return respuesta.json()
}

// REST: lista de destinos
export async function obtenerDestinos(signal) {
    const respuesta = await fetch('/api/destinos', { signal })

    if (!respuesta.ok) {
        throw new Error('No se pudo cargar la lista de destinos.')
    }

    return leerJson(respuesta)
}

// REST: un destino. Devuelve null si no existe.
export async function obtenerDestino(id, signal) {
    const respuesta = await fetch(`/api/destinos/${id}`, { signal })

    if (respuesta.status === 404) {
        return null
    }

    if (!respuesta.ok) {
        throw new Error('No se pudo cargar el destino.')
    }

    return leerJson(respuesta)
}

// GraphQL: vuelos y hoteles de un destino
export async function obtenerOpciones(destinoId, signal) {
    const respuesta = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: OPCIONES_VIAJE, variables: { destinoId } }),
        signal
    })

    if (!respuesta.ok) {
        throw new Error('No se pudieron cargar los vuelos y hoteles.')
    }

    const resultado = await leerJson(respuesta)

    if (resultado.errors?.length) {
        throw new Error(resultado.errors[0].message)
    }

    return resultado.data.opcionesViaje
}
