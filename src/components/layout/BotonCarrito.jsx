import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../../store/cartSlice.js'

function BotonCarrito() {
  const cantidad = useSelector(selectCartCount)

  return (
    <Link to="/carrito" className="nav-enlace d-inline-flex align-items-center gap-1">
      <ShoppingCart size={18} aria-hidden="true" />
      <span>Carrito</span>
      {cantidad > 0 && <span className="contador" aria-label={`${cantidad} servicios en el carrito`}>{cantidad}</span>}
    </Link>
  )
}

export default BotonCarrito
