import Boton from './Boton'
import { useViaje } from '../hooks/useViaje'
import { formatoPrecio, formatoFecha } from '../util/formato'

// Tarjeta de un hotel: estrellas, fechas, precio por noche, total y habitaciones que quedan.
// Cada vez que se agrega una habitación, la disponibilidad baja en 1.
function TarjetaHotel({ hotel, destino }) {
    const { agregar, quitarUnidad, cantidadDe } = useViaje()
    const clave = `hotel-${hotel.id}`
    const enViaje = cantidadDe(clave)
    const restantes = hotel.habitacionesDisponibles - enViaje
    const agotado = restantes <= 0

    // Precio de una habitación por toda la estadía
    const totalHabitacion = hotel.precioNoche * hotel.noches

    function sumar() {
        agregar({
            clave,
            tipo: 'Hotel',
            destino: destino.ciudad,
            nombre: hotel.nombre,
            detalle: `${hotel.noches} noches, del ${formatoFecha(hotel.desde)} al ${formatoFecha(hotel.hasta)}`,
            precio: totalHabitacion,
            disponibles: hotel.habitacionesDisponibles
        })
    }

    return (
        <article className="tw:flex tw:flex-col tw:gap-2 tw:rounded-xl tw:bg-white tw:p-4 tw:shadow">
            <h4 className="tw:text-lg tw:font-bold tw:text-fondo">{hotel.nombre}</h4>
            <p className="tw:text-sm">Categoría: {hotel.estrellas} estrellas</p>
            <p className="tw:text-sm">
                Del {formatoFecha(hotel.desde)} al {formatoFecha(hotel.hasta)} ({hotel.noches} noches)
            </p>
            <p className="tw:text-sm">{formatoPrecio(hotel.precioNoche)} por noche</p>
            <p className="tw:text-xl tw:font-bold">Total: {formatoPrecio(totalHabitacion)}</p>
            <p className={`tw:text-sm ${agotado ? 'tw:text-red-700' : 'tw:text-fondo-claro'}`}>
                {agotado ? 'Sin disponibilidad' : `${restantes} habitaciones disponibles`}
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

export default TarjetaHotel
