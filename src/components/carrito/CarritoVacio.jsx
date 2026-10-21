import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

function CarritoVacio() {
  return (
    <div className="tarjeta carrito-vacio">
      <ShoppingCart size={36} aria-hidden="true" />
      <h2 className="carrito-vacio-titulo">Tu carrito está vacío</h2>
      <p className="text-secundario">Sumá servicios y los vas a ver acá.</p>
      <Link to="/" className="btn-amicus">Buscar servicios</Link>
    </div>
  )
}

export default CarritoVacio
