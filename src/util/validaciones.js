import { MIN_NOMBRE, MIN_MENSAJE } from './config'

// Solo letras (con tildes y ñ) y espacios: sin números ni símbolos
const SOLO_LETRAS = /^[\p{L}\s]+$/u

// Letras, números, espacios y puntuación básica: sin otros símbolos
const TEXTO_SIN_SIMBOLOS = /^[\p{L}\p{N}\s.,¿?¡!]+$/u

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Valida el formulario de contacto. Devuelve un objeto con los errores
// encontrados; si está vacío, el formulario es válido.
export function validarContacto({ nombre, correo, mensaje }) {
    const errores = {}
    const nombreLimpio = nombre.trim()
    const mensajeLimpio = mensaje.trim()

    if (nombreLimpio.length < MIN_NOMBRE) {
        errores.nombre = `El nombre debe tener al menos ${MIN_NOMBRE} caracteres.`
    } else if (!SOLO_LETRAS.test(nombreLimpio)) {
        errores.nombre = 'El nombre solo puede tener letras, sin números ni símbolos.'
    }

    if (!CORREO.test(correo.trim())) {
        errores.correo = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.'
    }

    if (mensajeLimpio.length < MIN_MENSAJE) {
        errores.mensaje = `El mensaje debe tener al menos ${MIN_MENSAJE} caracteres.`
    } else if (!TEXTO_SIN_SIMBOLOS.test(mensajeLimpio)) {
        errores.mensaje = 'El mensaje no puede incluir símbolos (solo letras, números y puntuación básica).'
    }

    return errores
}
