import { useNavigate } from 'react-router-dom'
import useSesion from '../../hooks/useSesion.js'
import { iniciales } from '../../utils/formato.js'

// TODO (ver docs/PENDIENTES.md): convertir en menu desplegable con "Mi perfil" y "Mis ordenes"
function MenuUsuario() {
  const { usuario, cerrarSesion } = useSesion()
  const navigate = useNavigate()

  function salir() {
    cerrarSesion()
    navigate('/')
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <span className="avatar" aria-hidden="true">{iniciales(usuario)}</span>
      <span className="d-none d-md-inline fw-semibold">{usuario.nombre}</span>
      <button type="button" className="btn-texto" onClick={salir}>Salir</button>
    </div>
  )
}

export default MenuUsuario
