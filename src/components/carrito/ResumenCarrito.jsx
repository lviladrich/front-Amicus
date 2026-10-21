import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { confirmarCompra } from '../../api/amicus.js'
import useCarrito from '../../hooks/useCarrito.js'
import { formatearPrecio } from '../../utils/formato.js'
import MensajeError from '../comunes/MensajeError.jsx'

function ResumenCarrito({ carrito }) {
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const { refrescarCarrito } = useCarrito()
  const navigate = useNavigate()

  const sinCupo = carrito.items.some((item) => !item.disponible)

  async function confirmar() {
    setEnviando(true)
    setError('')
    try {
      const orden = await confirmarCompra()
      await refrescarCarrito()
      navigate(`/ordenes/${orden.id}/confirmacion`)
    } catch (fallo) {
      setError(fallo.message)
      setEnviando(false)
    }
  }

  return (
    <aside className="tarjeta carrito-resumen" aria-labelledby="titulo-resumen">
      <h2 id="titulo-resumen" className="carrito-resumen-titulo">Resumen</h2>
      <ul className="carrito-resumen-lista">
        {carrito.items.map((item) => (
          <li key={item.id}>
            <span>{item.titulo} ({item.cantidad})</span>
            <span>{formatearPrecio(item.subtotal)}</span>
          </li>
        ))}
      </ul>
      <div className="carrito-resumen-total">
        <span className="fw-semibold">Total</span>
        <span className="precio">{formatearPrecio(carrito.total)}</span>
      </div>
      <MensajeError>{error}</MensajeError>
      {sinCupo && <p className="texto-error">Hay servicios sin cupo. Ajustalos para poder confirmar.</p>}
      <button type="button" className="btn-amicus w-100" onClick={confirmar} disabled={enviando || sinCupo}>
        {enviando ? 'Confirmando...' : 'Confirmar compra'}
      </button>
      <Link to="/" className="carrito-seguir">Seguir buscando servicios</Link>
    </aside>
  )
}

export default ResumenCarrito
