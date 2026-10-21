import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import BotonCarrito from './BotonCarrito.jsx'
import MenuUsuario from './MenuUsuario.jsx'
import useSesion from '../../hooks/useSesion.js'

function Header() {
  const { usuario } = useSesion()

  return (
    <header className="header">
      <div className="container d-flex align-items-center justify-content-between py-2 gap-2">
        <Logo />
        <nav className="d-flex align-items-center gap-3 gap-md-4" aria-label="Principal">
          <Link to="/" className="nav-enlace d-none d-sm-inline">Servicios</Link>
          <BotonCarrito />
          {usuario
            ? <MenuUsuario />
            : <Link to="/login" className="btn-amicus btn-amicus-borde">Ingresar</Link>}
        </nav>
      </div>
    </header>
  )
}

export default Header
