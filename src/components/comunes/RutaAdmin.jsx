import { Link, Navigate, useLocation } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import useSesion from '../../hooks/useSesion.js'
import '../../styles/admin.css'

// Como RutaPrivada, pero ademas exige rol ADMIN. El back igual rechaza los pedidos de otros roles:
// esto es para no mostrar una pantalla que no van a poder usar.
function RutaAdmin({ children }) {
  const { usuario } = useSesion()
  const location = useLocation()

  if (!usuario) return <Navigate to="/login" replace state={{ desde: location.pathname }} />

  if (usuario.rol !== 'ADMIN') {
    return (
      <div className="container py-4">
        <div className="tarjeta admin-sin-permiso">
          <ShieldAlert size={36} aria-hidden="true" />
          <h1 className="h5 mb-0">No tenés permiso para ver esta página</h1>
          <p className="text-secundario mb-2">La administración de categorías y zonas es solo para administradores.</p>
          <Link to="/" className="btn-amicus">Volver al inicio</Link>
        </div>
      </div>
    )
  }

  return children
}

export default RutaAdmin
