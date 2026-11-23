import { useContext } from 'react'
import { ViajeContext } from '../context/ViajeContext'

// Hook para usar el viaje desde cualquier componente
export function useViaje() {
    const contexto = useContext(ViajeContext)

    if (!contexto) {
        throw new Error('useViaje debe usarse dentro de ViajeProvider')
    }

    return contexto
}
