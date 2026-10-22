import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, Receipt, User, Wrench } from 'lucide-react'
import useSesion from '../../hooks/useSesion.js'
import { iniciales } from '../../utils/formato.js'

function MenuUsuario() {
  const { usuario, cerrarSesion } = useSesion()
  const navigate = useNavigate()
  const [abierto, setAbierto] = useState(false)
  const contenedor = useRef(null)

  // Cierra el menu al hacer clic afuera o con Escape
  useEffect(() => {
    if (!abierto) return
    function alHacerClic(evento) {
      if (contenedor.current && !contenedor.current.contains(evento.target)) setAbierto(false)
    }
    function alApretarTecla(evento) {
      if (evento.key === 'Escape') setAbierto(false)
    }
    document.addEventListener('mousedown', alHacerClic)
    document.addEventListener('keydown', alApretarTecla)
    return () => {
      document.removeEventListener('mousedown', alHacerClic)
      document.removeEventListener('keydown', alApretarTecla)
    }
  }, [abierto])

  function salir() {
    setAbierto(false)
    cerrarSesion()
    navigate('/')
  }

  return (
    <div className="menu-usuario" ref={contenedor}>
      <button
        type="button"
        className="menu-usuario-boton"
        aria-haspopup="menu"
        aria-expanded={abierto}
        onClick={() => setAbierto(!abierto)}
      >
        <span className="avatar" aria-hidden="true">{iniciales(usuario)}</span>
        <span className="d-none d-md-inline">{usuario.nombre}</span>
        <ChevronDown size={16} aria-hidden="true" className="menu-usuario-flecha" />
      </button>

      {abierto && (
        <div className="menu-usuario-panel" role="menu">
          <div className="menu-usuario-datos">
            <span className="fw-semibold">{usuario.nombre} {usuario.apellido}</span>
            <span className="text-secundario small">{usuario.email}</span>
          </div>
          <Link to="/perfil" role="menuitem" className="menu-usuario-opcion" onClick={() => setAbierto(false)}>
            <User size={16} aria-hidden="true" />
            Mi perfil
          </Link>
          <Link to="/ordenes" role="menuitem" className="menu-usuario-opcion" onClick={() => setAbierto(false)}>
            <Receipt size={16} aria-hidden="true" />
            Mis órdenes
          </Link>
          <Link to="/mis-servicios" role="menuitem" className="menu-usuario-opcion" onClick={() => setAbierto(false)}>
            <Wrench size={16} aria-hidden="true" />
            Mis servicios
          </Link>
          <button type="button" role="menuitem" className="menu-usuario-opcion" onClick={salir}>
            <LogOut size={16} aria-hidden="true" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

export default MenuUsuario
