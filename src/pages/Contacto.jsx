import Aviso from '../components/Aviso'
import Boton from '../components/Boton'
import CampoFormulario from '../components/CampoFormulario'
import { useFormulario } from '../hooks/useFormulario'
import { validarContacto } from '../util/validaciones'
import { MIN_NOMBRE, MIN_MENSAJE, TELEFONO, TELEFONO_LINK, DIRECCION, CORREO } from '../util/config'

const VALORES_INICIALES = { nombre: '', correo: '', mensaje: '' }

// Página de contacto: datos de la agencia y formulario.
// El formulario no se envía si no cumple el mínimo de caracteres
// y muestra un aviso con el resultado.
function Contacto() {
    const { valores, errores, resultado, cambiar, enviar } = useFormulario(
        VALORES_INICIALES,
        validarContacto
    )

    return (
        <main className="tw:mx-auto tw:max-w-5xl tw:px-4 tw:py-10">
            <h1 className="tw:text-3xl tw:font-bold tw:text-fondo">Contáctanos</h1>
            <p className="tw:mt-2 tw:mb-8">
                Cuéntanos qué viaje tienes en mente. Nombre: mínimo {MIN_NOMBRE} caracteres.
                Mensaje: mínimo {MIN_MENSAJE} caracteres.
            </p>

            <div className="tw:grid tw:gap-8 tw:md:grid-cols-2">
                {/* Datos de contacto de la agencia */}
                <section className="tw:flex tw:flex-col tw:gap-5 tw:self-start tw:rounded-2xl tw:bg-fondo tw:p-6 tw:text-white">
                    <h2 className="tw:text-xl tw:font-bold tw:text-lima">Datos de contacto</h2>

                    <div>
                        <p className="tw:text-xs tw:font-bold tw:uppercase tw:text-lima">Teléfono</p>
                        <a href={`tel:${TELEFONO_LINK}`} className="tw:hover:underline">
                            {TELEFONO}
                        </a>
                    </div>

                    <div>
                        <p className="tw:text-xs tw:font-bold tw:uppercase tw:text-lima">Dirección</p>
                        <p>{DIRECCION}</p>
                    </div>

                    <div>
                        <p className="tw:text-xs tw:font-bold tw:uppercase tw:text-lima">Correo electrónico</p>
                        <a href={`mailto:${CORREO}`} className="tw:hover:underline">
                            {CORREO}
                        </a>
                    </div>
                </section>

                {/* Formulario */}
                <form onSubmit={enviar} noValidate className="tw:flex tw:flex-col tw:gap-4">
                    <CampoFormulario
                        etiqueta="Nombre"
                        nombre="nombre"
                        valor={valores.nombre}
                        alCambiar={cambiar}
                        error={errores.nombre}
                    />
                    <CampoFormulario
                        etiqueta="Correo"
                        nombre="correo"
                        tipo="email"
                        valor={valores.correo}
                        alCambiar={cambiar}
                        error={errores.correo}
                    />
                    <CampoFormulario
                        etiqueta="Mensaje"
                        nombre="mensaje"
                        tipo="textarea"
                        valor={valores.mensaje}
                        alCambiar={cambiar}
                        error={errores.mensaje}
                    />

                    {/* Aviso general según el resultado del envío */}
                    {resultado === 'error' && (
                        <Aviso tipo="error">
                            No se pudo enviar. Revisa los campos marcados e inténtalo de nuevo.
                        </Aviso>
                    )}
                    {resultado === 'exito' && (
                        <Aviso tipo="exito">Mensaje enviado. Te responderemos pronto.</Aviso>
                    )}

                    <Boton type="submit" className="tw:self-start">
                        Enviar mensaje
                    </Boton>
                </form>
            </div>
        </main>
    )
}

export default Contacto