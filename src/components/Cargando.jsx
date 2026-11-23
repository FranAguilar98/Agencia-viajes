// Indicador de carga mientras llegan los datos de las APIs mock
function Cargando({ texto = 'Cargando...' }) {
    return (
        <div
            role="status"
            className="tw:flex tw:items-center tw:justify-center tw:gap-3 tw:py-12 tw:text-fondo"
        >
            <span className="tw:inline-block tw:h-6 tw:w-6 tw:animate-spin tw:rounded-full tw:border-4 tw:border-fondo-claro tw:border-t-lima" />
            <span>{texto}</span>
        </div>
    )
}

export default Cargando
