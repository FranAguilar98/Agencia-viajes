import { Link } from 'react-router-dom'

// Página que se muestra cuando la ruta no existe
function NoEncontrado() {
    return (
        <main className="tw:mx-auto tw:max-w-xl tw:px-4 tw:py-16 tw:text-center">
            <h1 className="tw:text-3xl tw:font-bold tw:text-fondo">Página no encontrada</h1>
            <p className="tw:mt-3">La dirección que buscas no existe.</p>
            <Link
                to="/"
                className="tw:mt-6 tw:inline-block tw:rounded-full tw:bg-lima tw:px-5 tw:py-2 tw:font-semibold tw:text-fondo-oscuro"
            >
                Volver al inicio
            </Link>
        </main>
    )
}

export default NoEncontrado
