import { Link } from 'react-router-dom'
import { MapPinOff } from 'lucide-react'
import '../styles/informacion.css'

// Se muestra para cualquier ruta que no exista (<Route path="*"> en App.jsx)
function NoEncontrada() {
  return (
    <div className="container py-4">
      <div className="tarjeta no-encontrada">
        <MapPinOff size={36} aria-hidden="true" />
        <p className="no-encontrada-codigo">404</p>
        <h1>No encontramos esta página</h1>
        <p className="text-secundario">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
        <div className="no-encontrada-acciones">
          <Link to="/" className="btn-amicus">Volver al inicio</Link>
          <Link to="/ayuda" className="btn-amicus btn-amicus-borde">Ir a Ayuda</Link>
        </div>
      </div>
    </div>
  )
}

export default NoEncontrada
