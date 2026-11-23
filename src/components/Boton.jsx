// Botón reutilizable. variante: 'principal' | 'secundario' | 'peligro'
const VARIANTES = {
    principal: 'tw:bg-lima tw:text-fondo-oscuro tw:hover:bg-lima-fuerte',
    secundario: 'tw:bg-fondo tw:text-lima tw:hover:bg-fondo-claro',
    peligro: 'tw:bg-white tw:text-fondo tw:border tw:border-fondo tw:hover:bg-alerta'
}

function Boton({ variante = 'principal', className = '', children, ...resto }) {
    return (
        <button
            type="button"
            className={`tw:rounded-full tw:px-5 tw:py-2 tw:text-sm tw:font-semibold tw:transition-colors tw:cursor-pointer tw:disabled:cursor-not-allowed tw:disabled:opacity-50 ${VARIANTES[variante]} ${className}`}
            {...resto}
        >
            {children}
        </button>
    )
}

export default Boton
