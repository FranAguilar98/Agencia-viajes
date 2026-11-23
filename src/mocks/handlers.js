import { http, HttpResponse, delay } from 'msw'
import { graphql } from 'msw/graphql'

// Enlace al endpoint GraphQL mock
const apiGraphQL = graphql.link('/graphql')

// ---------------------------------------------------------------------------
// Datos de prueba (precios en pesos chilenos)
// ---------------------------------------------------------------------------

// Destinos disponibles (los entrega la API REST: GET /api/destinos)
const destinos = [
    {
        id: 'osaka',
        ciudad: 'Osaka',
        pais: 'Japón',
        img: 'osaka.jpg',
        resumen: 'Cocina callejera, castillos y vida nocturna en el corazón de Kansai.',
        colores: ['#1b5660', '#d4f58b']
    },
    {
        id: 'rio',
        ciudad: 'Río de Janeiro',
        pais: 'Brasil',
        img: 'rio.webp',
        resumen: 'Playas, montañas y samba frente al Atlántico.',
        colores: ['#0c2c31', '#b9e35f']
    },
    {
        id: 'madrid',
        ciudad: 'Madrid',
        pais: 'España',
        img: 'madrid.jpeg',
        resumen: 'Museos de primer nivel, plazas históricas y tapas hasta tarde.',
        colores: ['#123f45', '#d4f58b']
    },
    {
        id: 'cdmx',
        ciudad: 'Ciudad de México',
        pais: 'México',
        img: 'cdmx.webp',
        resumen: 'Pirámides, mercados y una gastronomía reconocida en todo el mundo.',
        colores: ['#1b5660', '#b9e35f']
    }
]

// Vuelos y hoteles por destino (los entrega la API GraphQL: query OpcionesViaje)
const opcionesPorDestino = {
    osaka: {
        vuelos: [
            { id: 'v-osa-1', aerolinea: 'Pacífico Air', origen: 'Santiago (SCL)', salida: '2027-03-10', llegada: '2027-03-11', precio: 1450000, asientosDisponibles: 12 },
            { id: 'v-osa-2', aerolinea: 'Andes Global', origen: 'Santiago (SCL)', salida: '2027-04-02', llegada: '2027-04-03', precio: 1320000, asientosDisponibles: 8 }
        ],
        hoteles: [
            { id: 'h-osa-1', nombre: 'Hotel Namba Central', estrellas: 4, precioNoche: 95000, noches: 5, desde: '2027-03-11', hasta: '2027-03-16', habitacionesDisponibles: 6 },
            { id: 'h-osa-2', nombre: 'Residencia Umeda', estrellas: 3, precioNoche: 62000, noches: 5, desde: '2027-03-11', hasta: '2027-03-16', habitacionesDisponibles: 2 }
        ]
    },
    rio: {
        vuelos: [
            { id: 'v-rio-1', aerolinea: 'Pacífico Air', origen: 'Santiago (SCL)', salida: '2027-02-05', llegada: '2027-02-05', precio: 520000, asientosDisponibles: 20 },
            { id: 'v-rio-2', aerolinea: 'Andes Global', origen: 'Santiago (SCL)', salida: '2027-02-19', llegada: '2027-02-19', precio: 565000, asientosDisponibles: 4 }
        ],
        hoteles: [
            { id: 'h-rio-1', nombre: 'Hotel Orla Copacabana', estrellas: 4, precioNoche: 88000, noches: 6, desde: '2027-02-05', hasta: '2027-02-11', habitacionesDisponibles: 8 },
            { id: 'h-rio-2', nombre: 'Posada Santa Teresa', estrellas: 3, precioNoche: 54000, noches: 6, desde: '2027-02-05', hasta: '2027-02-11', habitacionesDisponibles: 10 }
        ]
    },
    madrid: {
        vuelos: [
            { id: 'v-mad-1', aerolinea: 'Andes Global', origen: 'Santiago (SCL)', salida: '2027-05-14', llegada: '2027-05-15', precio: 780000, asientosDisponibles: 9 },
            { id: 'v-mad-2', aerolinea: 'Pacífico Air', origen: 'Santiago (SCL)', salida: '2027-06-03', llegada: '2027-06-04', precio: 830000, asientosDisponibles: 15 }
        ],
        hoteles: [
            { id: 'h-mad-1', nombre: 'Hotel Gran Vía Real', estrellas: 4, precioNoche: 105000, noches: 5, desde: '2027-05-15', hasta: '2027-05-20', habitacionesDisponibles: 5 },
            { id: 'h-mad-2', nombre: 'Hostal Plaza Mayor', estrellas: 2, precioNoche: 48000, noches: 5, desde: '2027-05-15', hasta: '2027-05-20', habitacionesDisponibles: 10 }
        ]
    },
    cdmx: {
        vuelos: [
            { id: 'v-mex-1', aerolinea: 'Pacífico Air', origen: 'Santiago (SCL)', salida: '2027-04-21', llegada: '2027-04-21', precio: 640000, asientosDisponibles: 7 },
            { id: 'v-mex-2', aerolinea: 'Andes Global', origen: 'Santiago (SCL)', salida: '2027-05-08', llegada: '2027-05-08', precio: 610000, asientosDisponibles: 10 }
        ],
        hoteles: [
            { id: 'h-mex-1', nombre: 'Hotel Reforma Centro', estrellas: 4, precioNoche: 79000, noches: 5, desde: '2027-04-21', hasta: '2027-04-26', habitacionesDisponibles: 11 },
            { id: 'h-mex-2', nombre: 'Casa Coyoacán', estrellas: 3, precioNoche: 51000, noches: 5, desde: '2027-04-21', hasta: '2027-04-26', habitacionesDisponibles: 3 }
        ]
    }
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

export const handlers = [
    // API REST mock: lista de destinos con país y resumen
    http.get('/api/destinos', async () => {
        await delay(600)
        return HttpResponse.json(destinos)
    }),

    // API REST mock: un destino puntual (usado en la página de detalle)
    http.get('/api/destinos/:id', async ({ params }) => {
        await delay(300)
        const destino = destinos.find((d) => d.id === params.id)

        if (!destino) {
            return HttpResponse.json({ mensaje: 'Destino no encontrado' }, { status: 404 })
        }

        return HttpResponse.json(destino)
    }),

    // API GraphQL mock: vuelos y hoteles de un destino
    // (precios, fechas y disponibilidad)
    apiGraphQL.query('OpcionesViaje', async ({ variables }) => {
        await delay(600)
        const opciones = opcionesPorDestino[variables.destinoId]

        return HttpResponse.json({
            data: {
                opcionesViaje: opciones
                    ? { vuelos: opciones.vuelos, hoteles: opciones.hoteles }
                    : null
            }
        })
    })
]
