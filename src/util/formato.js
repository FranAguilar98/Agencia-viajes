// Da formato de pesos chilenos: 1450000 -> "$1.450.000"
export function formatoPrecio(valor) {
    return '$' + Number(valor).toLocaleString('es-CL')
}

// Convierte "2027-03-10" en "10-03-2027" (sin usar zona horaria)
export function formatoFecha(texto) {
    const [anio, mes, dia] = texto.split('-')
    return `${dia}-${mes}-${anio}`
}
