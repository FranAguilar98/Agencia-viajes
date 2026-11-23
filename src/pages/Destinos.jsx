import { useEffect, useState } from 'react'
import Cargando from '../components/Cargando'
import Aviso from '../components/Aviso'
import TarjetaDestino from '../components/TarjetaDestino'
import { obtenerDestinos } from '../util/api'

// Lista de destinos obtenida desde la API REST mock
function Destinos() {
    const [destinos, setDestinos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controlador = new AbortController()

        async function cargar() {
            try {
                setDestinos(await obtenerDestinos(controlador.signal))
            } catch (e) {
                // Si la petición fue cancelada al salir de la página, no se muestra error
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

        // Cancela la petición si el componente se desmonta
        return () => controlador.abort()
    }, [])

    return (
        <main className="tw:mx-auto tw:max-w-6xl tw:px-4 tw:py-10">
            <h1 className="tw:text-3xl tw:font-bold tw:text-fondo">Destinos</h1>
            <p className="tw:mt-2 tw:mb-6">Selecciona un destino para ver sus vuelos y hoteles.</p>

            {cargando ? (
                <Cargando texto="Cargando destinos..." />
            ) : error ? (
                <Aviso tipo="error">{error}</Aviso>
            ) : (
                <div className="tw:grid tw:gap-6 tw:sm:grid-cols-2 tw:lg:grid-cols-4">
                    {destinos.map((destino) => (
                        <TarjetaDestino key={destino.id} destino={destino} />
                    ))}
                </div>
            )}
        </main>
    )
}

export default Destinos
