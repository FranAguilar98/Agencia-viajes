import Boton from './Boton'
import { useViaje } from '../hooks/useViaje'
import { formatoPrecio, formatoFecha } from '../util/formato'

// Tarjeta de un vuelo: aerolínea, fechas, precio y asientos que quedan.
// Cada vez que se agrega un asiento, la disponibilidad baja en 1.
function TarjetaVuelo({ vuelo, destino }) {
    const { agregar, quitarUnidad, cantidadDe } = useViaje()
    const clave = `vuelo-${vuelo.id}`
    const enViaje = cantidadDe(clave)
    const restantes = vuelo.asientosDisponibles - enViaje
    const agotado = restantes <= 0

    function sumar() {
        agregar({
            clave,
            tipo: 'Vuelo',
            destino: destino.ciudad,
            nombre: `${vuelo.aerolinea}: ${vuelo.origen} a ${destino.ciudad}`,
            detalle: `Sale ${formatoFecha(vuelo.salida)}, llega ${formatoFecha(vuelo.llegada)}`,
            precio: vuelo.precio,
            disponibles: vuelo.asientosDisponibles
        })
    }

    return (
        <article className="tw:flex tw:flex-col tw:gap-2 tw:rounded-xl tw:bg-white tw:p-4 tw:shadow">
            <h4 className="tw:text-lg tw:font-bold tw:text-fondo">{vuelo.aerolinea}</h4>
            <p className="tw:text-sm">{vuelo.origen} a {destino.ciudad}</p>
            <p className="tw:text-sm">Salida: {formatoFecha(vuelo.salida)}</p>
            <p className="tw:text-sm">Llegada: {formatoFecha(vuelo.llegada)}</p>
            <p className="tw:text-xl tw:font-bold">{formatoPrecio(vuelo.precio)}</p>
            <p className={`tw:text-sm ${agotado ? 'tw:text-red-700' : 'tw:text-fondo-claro'}`}>
                {agotado ? 'Sin disponibilidad' : `${restantes} asientos disponibles`}
            </p>
            {enViaje > 0 && (
                <p className="tw:text-sm tw:font-semibold">En tu viaje: {enViaje}</p>
            )}

            <div className="tw:flex tw:flex-wrap tw:gap-2">
                <Boton variante="principal" disabled={agotado} onClick={sumar}>
                    Agregar a mi viaje
                </Boton>
                {enViaje > 0 && (
                    <Boton variante="peligro" onClick={() => quitarUnidad(clave)}>
                        Quitar uno
                    </Boton>
                )}
            </div>
        </article>
    )
}

export default TarjetaVuelo
