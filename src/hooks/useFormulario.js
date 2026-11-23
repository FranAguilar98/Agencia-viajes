import { useState } from 'react'

// Hook genérico para formularios con validación.
// - valoresIniciales: objeto con los campos
// - validar: función que recibe los valores y devuelve un objeto de errores
export function useFormulario(valoresIniciales, validar) {
    const [valores, setValores] = useState(valoresIniciales)
    const [errores, setErrores] = useState({})
    const [resultado, setResultado] = useState(null) // 'exito' | 'error' | null

    // Actualiza un campo cuando el usuario escribe
    function cambiar(evento) {
        const { name, value } = evento.target
        setValores((anteriores) => ({ ...anteriores, [name]: value }))
    }

    // Valida al enviar: si hay errores no se envía y se muestra el aviso
    function enviar(evento, alExito) {
        evento.preventDefault()
        const erroresEncontrados = validar(valores)
        setErrores(erroresEncontrados)

        if (Object.keys(erroresEncontrados).length > 0) {
            setResultado('error')
            return
        }

        setResultado('exito')
        if (alExito) {
            alExito(valores)
        }
        setValores(valoresIniciales)
    }

    return { valores, errores, resultado, cambiar, enviar }
}
