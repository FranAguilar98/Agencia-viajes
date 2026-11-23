import { Link } from 'react-router-dom'
import Aviso from '../components/Aviso'
import Boton from '../components/Boton'
import ItemViaje from '../components/ItemViaje'
import { useViaje } from '../hooks/useViaje'
import { formatoPrecio } from '../util/formato'

// Resumen del viaje: permite cambiar cantidades, quitar elementos o vaciar todo
function MiViaje() {
    const { items, total, agregar, quitarUnidad, quitar, vaciar } = useViaje()

    return (
        <main className="tw:mx-auto tw:max-w-4xl tw:px-4 tw:py-10">
            <h1 className="tw:text-3xl tw:font-bold tw:text-fondo">Mi viaje</h1>

            {items.length === 0 ? (
                <div className="tw:mt-6 tw:flex tw:flex-col tw:items-start tw:gap-4">
                    <Aviso tipo="info">Aún no has agregado vuelos ni hoteles a tu viaje.</Aviso>
                    <Link
                        to="/destinos"
                        className="tw:rounded-full tw:bg-lima tw:px-5 tw:py-2 tw:text-sm tw:font-semibold tw:text-fondo-oscuro tw:hover:bg-lima-fuerte"
                    >
                        Explorar destinos
                    </Link>
                </div>
            ) : (
                <>
                    <ul className="tw:mt-6 tw:flex tw:flex-col tw:gap-3">
                        {items.map((item) => (
                            <ItemViaje
                                key={item.clave}
                                item={item}
                                alSumar={agregar}
                                alRestar={quitarUnidad}
                                alQuitar={quitar}
                            />
                        ))}
                    </ul>

                    <div className="tw:mt-6 tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-4 tw:rounded-xl tw:bg-fondo tw:p-5 tw:text-white">
                        <p className="tw:text-xl tw:font-bold">
                            Total: <span className="tw:text-lima">{formatoPrecio(total)}</span>
                        </p>
                        <Boton variante="principal" onClick={vaciar}>
                            Vaciar viaje
                        </Boton>
                    </div>
                </>
            )}
        </main>
    )
}

export default MiViaje
