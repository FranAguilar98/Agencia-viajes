import { NavLink, Link } from 'react-router-dom'
import { useViaje } from '../hooks/useViaje'
import { NOMBRE_AGENCIA } from '../util/config'

// Barra de navegación superior con los enlaces de React Router
function Navegacion() {
    const { items } = useViaje()

    const claseEnlace = ({ isActive }) =>
        'tw:rounded-full tw:px-4 tw:py-2 tw:text-sm tw:font-medium tw:transition-colors ' +
        (isActive ? 'tw:bg-lima tw:text-fondo-oscuro' : 'tw:text-white tw:hover:text-lima')

    return (
        <header className="tw:bg-fondo-oscuro">
            <nav className="tw:mx-auto tw:flex tw:max-w-6xl tw:flex-wrap tw:items-center tw:justify-between tw:gap-3 tw:px-4 tw:py-3">
                <Link to="/" className="tw:text-lg tw:font-bold tw:tracking-wide tw:text-lima">
                    {NOMBRE_AGENCIA}
                </Link>

                <div className="tw:flex tw:flex-wrap tw:gap-1">
                    <NavLink to="/" end className={claseEnlace}>Inicio</NavLink>
                    <NavLink to="/destinos" className={claseEnlace}>Destinos</NavLink>
                    <NavLink to="/mi-viaje" className={claseEnlace}>Mi viaje ({items.length})</NavLink>
                    <NavLink to="/contacto" className={claseEnlace}>Contáctanos</NavLink>
                </div>
            </nav>
        </header>
    )
}

export default Navegacion
