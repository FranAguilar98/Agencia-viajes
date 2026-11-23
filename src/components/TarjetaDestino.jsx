import { Link } from 'react-router-dom'

// Tarjeta de un destino: imagen, ciudad, país, resumen y enlace al detalle
function TarjetaDestino({ destino }) {
    const [colorA, colorB] = destino.colores

    return (
        <article className="tw:overflow-hidden tw:rounded-2xl tw:bg-white tw:shadow-md">
            <div
                className="tw:h-40 tw:overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${colorA}, ${colorB})` }}
            >
                <img
                    src={`${import.meta.env.BASE_URL}img/${destino.img}`}
                    alt={`Vista de ${destino.ciudad}`}
                    className="tw:h-full tw:w-full tw:object-cover"
                />
            </div>

            <div className="tw:flex tw:flex-col tw:gap-3 tw:p-4">
                <h3 className="tw:text-2xl tw:font-bold tw:text-fondo">{destino.ciudad}</h3>

                <p className="tw:text-sm tw:font-semibold tw:uppercase tw:tracking-wide tw:text-fondo-claro">
                    {destino.pais}
                </p>
                <p className="tw:text-sm">{destino.resumen}</p>

                <Link
                    to={`/destinos/${destino.id}`}
                    className="tw:mt-2 tw:self-start tw:rounded-full tw:bg-fondo tw:px-5 tw:py-2 tw:text-sm tw:font-semibold tw:text-lima tw:hover:bg-fondo-claro"
                >
                    Ver vuelos y hoteles
                </Link>
            </div>
        </article>
    )
}

export default TarjetaDestino