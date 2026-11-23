import { Routes, Route } from 'react-router-dom'
import Navegacion from './components/Navegacion'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Destinos from './pages/Destinos'
import DetalleDestino from './pages/DetalleDestino'
import MiViaje from './pages/MiViaje'
import Contacto from './pages/Contacto'
import NoEncontrado from './pages/NoEncontrado'

// Rutas de la aplicación (React Router)
function App() {
    return (
        <div className="tw:flex tw:min-h-screen tw:flex-col">
            <Navegacion />

            <div className="tw:flex-1">
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/destinos" element={<Destinos />} />
                    <Route path="/destinos/:id" element={<DetalleDestino />} />
                    <Route path="/mi-viaje" element={<MiViaje />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="*" element={<NoEncontrado />} />
                </Routes>
            </div>

            <Footer />
        </div>
    )
}

export default App
