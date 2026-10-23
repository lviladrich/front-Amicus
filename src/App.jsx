import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SesionProvider from './context/SesionProvider.jsx'
import CarritoProvider from './context/CarritoProvider.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import RutaPrivada from './components/comunes/RutaPrivada.jsx'
import RutaAdmin from './components/comunes/RutaAdmin.jsx'
import Inicio from './pages/Inicio.jsx'
import DetalleServicio from './pages/DetalleServicio.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Carrito from './pages/Carrito.jsx'
import Confirmacion from './pages/Confirmacion.jsx'
import Perfil from './pages/Perfil.jsx'
import Admin from './pages/Admin.jsx'
import MisOrdenes from './pages/MisOrdenes.jsx'
import DetalleOrdenPage from './pages/DetalleOrdenPage.jsx'
import MisServicios from './pages/MisServicios.jsx'
import FormularioServicioPage from './pages/FormularioServicioPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <SesionProvider>
        <CarritoProvider>
          <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1 d-flex flex-column">
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/servicios/:id" element={<DetalleServicio />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/carrito" element={<RutaPrivada><Carrito /></RutaPrivada>} />
                <Route path="/ordenes/:id/confirmacion" element={<RutaPrivada><Confirmacion /></RutaPrivada>} />
                <Route path="/perfil" element={<RutaPrivada><Perfil /></RutaPrivada>} />
                <Route path="/admin" element={<RutaAdmin><Admin /></RutaAdmin>} />
                <Route path="/ordenes" element={<RutaPrivada><MisOrdenes /></RutaPrivada>} />
                <Route path="/ordenes/:id" element={<RutaPrivada><DetalleOrdenPage /></RutaPrivada>} />
                <Route path="/mis-servicios" element={<RutaPrivada><MisServicios /></RutaPrivada>} />
                <Route path="/mis-servicios/nuevo" element={<RutaPrivada><FormularioServicioPage /></RutaPrivada>} />
                <Route path="/mis-servicios/:id/editar" element={<RutaPrivada><FormularioServicioPage /></RutaPrivada>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CarritoProvider>
      </SesionProvider>
    </BrowserRouter>
  )
}

export default App
