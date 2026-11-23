import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contacto from '../src/pages/Contacto'
import { validarContacto } from '../src/util/validaciones'

describe('validarContacto', () => {
    it('rechaza nombre y mensaje cortos', () => {
        const errores = validarContacto({ nombre: 'Al', correo: 'a@b.cl', mensaje: 'Hola' })

        expect(errores.nombre).toBeDefined()
        expect(errores.mensaje).toBeDefined()
        expect(errores.correo).toBeUndefined()
    })

    it('rechaza símbolos en nombre y mensaje', () => {
        const errores = validarContacto({
            nombre: 'Ana#Perez',
            correo: 'ana@correo.cl',
            mensaje: 'Quiero viajar a Madrid $$$'
        })

        expect(errores.nombre).toBeDefined()
        expect(errores.mensaje).toBeDefined()
    })

    it('acepta datos correctos', () => {
        const errores = validarContacto({
            nombre: 'Ana Pérez',
            correo: 'ana@correo.cl',
            mensaje: 'Quiero viajar a Madrid en mayo.'
        })

        expect(errores).toEqual({})
    })
})

describe('Formulario de contacto', () => {
    it('no envía y muestra aviso si faltan caracteres', async () => {
        const usuario = userEvent.setup()
        render(<Contacto />)

        await usuario.type(screen.getByLabelText('Nombre'), 'Al')
        await usuario.type(screen.getByLabelText('Mensaje'), 'Hola')
        await usuario.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

        expect(screen.getByText(/No se pudo enviar/)).toBeInTheDocument()
        expect(screen.queryByText(/Mensaje enviado/)).not.toBeInTheDocument()
    })

    it('envía y muestra aviso de éxito con datos válidos', async () => {
        const usuario = userEvent.setup()
        render(<Contacto />)

        await usuario.type(screen.getByLabelText('Nombre'), 'Ana Pérez')
        await usuario.type(screen.getByLabelText('Correo'), 'ana@correo.cl')
        await usuario.type(screen.getByLabelText('Mensaje'), 'Quiero viajar a Osaka en marzo.')
        await usuario.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

        expect(screen.getByText(/Mensaje enviado/)).toBeInTheDocument()
    })
})
