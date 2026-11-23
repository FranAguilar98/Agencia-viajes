import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cargando from '../components/Cargando'
import Aviso from '../components/Aviso'
import TarjetaVuelo from '../components/TarjetaVuelo'
import TarjetaHotel from '../components/TarjetaHotel'
import { obtenerDestino, obtenerOpciones } from '../util/api'

// Envoltorio: usa "key" para reiniciar el estado al cambiar de destino
function DetalleDestino() {
    const { id } = useParams()
    return <Detalle key={id} id={id} />
}

// Muestra el destino (API REST) y sus vuelos y hoteles (API GraphQL)
function Detalle({ id }) {
    const [destino, setDestino] = useState(null)
    const [opciones, setOpciones] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controlador = new AbortController()

        async function cargar() {
            try {
                // Las dos consultas se hacen en paralelo
                const [datosDestino, datosOpciones] = await Promise.all([
                    obtenerDestino(id, controlador.signal),
                    obtenerOpciones(id, controlador.signal)
                ])
                setDestino(datosDestino)
                setOpciones(datosOpciones)
            } catch (e) {
                if (!controlador.signal.aborted) {
                    setError(e.message)
                }
            } finally {
                if (!controlador.signal.aborted) {
                    setCargando(false)
                }
            }
        }

        cargar()

        return () => controlador.abort()
    }, [id])

    return (
        <main className="tw:mx-auto tw:max-w-6xl tw:px-4 tw:py-10">
            <Link to="/destinos" className="tw:text-sm tw:font-semibold tw:text-fondo-claro tw:hover:underline">
                Volver a destinos
            </Link>

            {cargando ? (
                <Cargando texto="Buscando vuelos y hoteles..." />
            ) : error ? (
                <div className="tw:mt-4"><Aviso tipo="error">{error}</Aviso></div>
            ) : !destino || !opciones ? (
                <div className="tw:mt-4"><Aviso tipo="info">Destino no encontrado.</Aviso></div>
            ) : (
                <>
                    <h1 className="tw:mt-4 tw:text-3xl tw:font-bold tw:text-fondo">
                        {destino.ciudad}, {destino.pais}
                    </h1>
                    <p className="tw:mt-2">{destino.resumen}</p>

                    <h2 className="tw:mt-10 tw:mb-4 tw:text-2xl tw:font-bold tw:text-fondo">Vuelos disponibles</h2>
                    <div className="tw:grid tw:gap-4 tw:md:grid-cols-2">
                        {opciones.vuelos.map((vuelo) => (
                            <TarjetaVuelo key={vuelo.id} vuelo={vuelo} destino={destino} />
                        ))}
                    </div>

                    <h2 className="tw:mt-10 tw:mb-4 tw:text-2xl tw:font-bold tw:text-fondo">Hoteles disponibles</h2>
                    <div className="tw:grid tw:gap-4 tw:md:grid-cols-2">
                        {opciones.hoteles.map((hotel) => (
                            <TarjetaHotel key={hotel.id} hotel={hotel} destino={destino} />
                        ))}
                    </div>
                </>
            )}
        </main>
    )
}

export default DetalleDestino
