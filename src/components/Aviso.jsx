// Mensaje de aviso para el usuario. 
const ESTILOS = {
    exito: 'tw:bg-exito tw:text-fondo-oscuro tw:border-lima-fuerte',
    error: 'tw:bg-alerta tw:text-tinta tw:border-red-300',
    info: 'tw:bg-white tw:text-fondo tw:border-fondo-claro'
}

function Aviso({ tipo = 'info', children }) {
    return (
        <p
            role={tipo === 'error' ? 'alert' : 'status'}
            className={`tw:rounded-lg tw:border tw:px-4 tw:py-3 tw:text-sm ${ESTILOS[tipo]}`}
        >
            {children}
        </p>
    )
}

export default Aviso
