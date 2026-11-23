import Boton from './Boton'
import { formatoPrecio } from '../util/formato'

// Fila de "Mi viaje": muestra la línea elegida, su cantidad y los botones
// para sumar una unidad, restar una unidad o quitar la línea completa.
function ItemViaje({ item, alSumar, alRestar, alQuitar }) {
    const sinCupos = item.cantidad >= item.disponibles

    return (
        <li className="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-3 tw:rounded-xl tw:bg-white tw:p-4 tw:shadow">
            <div>
                <p className="tw:text-xs tw:font-semibold tw:uppercase tw:text-fondo-claro">
                    {item.tipo} en {item.destino}
                </p>
                <p className="tw:font-bold tw:text-fondo">{item.nombre}</p>
                <p className="tw:text-sm">{item.detalle}</p>
                <p className="tw:text-sm">
                    {formatoPrecio(item.precio)} cada uno
                </p>
            </div>

            <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3">
                {/* Controles de cantidad */}
                <div className="tw:flex tw:items-center tw:gap-2">
                    <Boton variante="peligro" aria-label="Restar una unidad" onClick={() => alRestar(item.clave)}>
                        -
                    </Boton>
                    <span className="tw:min-w-6 tw:text-center tw:font-bold">{item.cantidad}</span>
                    <Boton
                        variante="secundario"
                        aria-label="Sumar una unidad"
                        disabled={sinCupos}
                        onClick={() => alSumar(item)}
                    >
                        +
                    </Boton>
                </div>

                <span className="tw:text-lg tw:font-bold">
                    {formatoPrecio(item.precio * item.cantidad)}
                </span>

                <Boton variante="peligro" onClick={() => alQuitar(item.clave)}>
                    Quitar
                </Boton>
            </div>
        </li>
    )
}

export default ItemViaje
