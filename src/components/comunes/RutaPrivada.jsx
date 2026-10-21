import { Navigate, useLocation } from 'react-router-dom'
import useSesion from '../../hooks/useSesion.js'

// Si no hay sesion manda al login y guarda desde donde venia para volver despues
function RutaPrivada({ children }) {
  const { usuario } = useSesion()
  const location = useLocation()
  if (!usuario) return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  return children
}

export default RutaPrivada
