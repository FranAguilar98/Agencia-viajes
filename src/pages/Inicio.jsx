import { Link } from 'react-router-dom'
import { NOMBRE_AGENCIA } from '../util/config'

// Página de inicio: presentación de la agencia y llamado a explorar destinos
function Inicio() {
    return (
        <main>
            {/* Portada: título y llamado a la acción */}
            <section className="tw:bg-fondo tw:text-white">
                <div className="tw:mx-auto tw:flex tw:max-w-6xl tw:flex-col tw:gap-5 tw:px-4 tw:py-16">
                    <p className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-widest tw:text-lima">
                        {NOMBRE_AGENCIA}
                    </p>
                    <h1 className="tw:max-w-2xl tw:text-4xl tw:font-bold tw:leading-tight tw:md:text-5xl">
                        Planifica tu viaje completo en un solo lugar
                    </h1>
                    <p className="tw:max-w-xl tw:text-lg">
                        Elige tu destino y revisa los vuelos y hoteles disponibles, con precios,
                        fechas y disponibilidad al día.
                    </p>
                    <Link
                        to="/destinos"
                        className="tw:self-start tw:rounded-full tw:bg-lima tw:px-6 tw:py-3 tw:font-semibold tw:text-fondo-oscuro tw:hover:bg-lima-fuerte"
                    >
                        Explorar destinos
                    </Link>
                </div>
            </section>

            {/* Imagen de portada */}
            <img
                src={`${import.meta.env.BASE_URL}img/inicio.jpg`}
                alt="Paisaje de viaje"
                className="tw:h-64 tw:w-full tw:object-cover tw:md:h-96"
            />

            {/* Los tres pasos para armar el viaje */}
            <section className="tw:mx-auto tw:grid tw:max-w-6xl tw:gap-6 tw:px-4 tw:py-12 tw:md:grid-cols-3">
                <div>
                    <h2 className="tw:text-xl tw:font-bold tw:text-fondo">1. Elige un destino</h2>
                    <p className="tw:mt-2 tw:text-sm">Osaka, Río de Janeiro, Madrid y Ciudad de México, con sus actividades más populares.</p>
                </div>
                <div>
                    <h2 className="tw:text-xl tw:font-bold tw:text-fondo">2. Compara opciones</h2>
                    <p className="tw:mt-2 tw:text-sm">Mira vuelos y hoteles con sus precios, fechas y cupos disponibles.</p>
                </div>
                <div>
                    <h2 className="tw:text-xl tw:font-bold tw:text-fondo">3. Arma tu viaje</h2>
                    <p className="tw:mt-2 tw:text-sm">Agrega o quita opciones en Mi viaje y revisa el total antes de decidir.</p>
                </div>
            </section>
        </main>
    )
}

export default Inicio