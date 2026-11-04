import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUsuario } from '../../store/authSlice.js'

// Si no hay sesion manda al login y guarda desde donde venia para volver despues
function RutaPrivada({ children }) {
  const usuario = useSelector(selectUsuario)
  const location = useLocation()
  if (!usuario) return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  return children
}

export default RutaPrivada
