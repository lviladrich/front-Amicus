import { useState } from 'react'
import { Wrench, TriangleAlert } from 'lucide-react'
import { actualizarItemCarrito, quitarItemCarrito } from '../../api/amicus.js'
import { formatearPrecio } from '../../utils/formato.js'
import SelectorFrecuencia from './SelectorFrecuencia.jsx'
import StepperCantidad from './StepperCantidad.jsx'
import MensajeError from '../comunes/MensajeError.jsx'

// Cada respuesta del back es el carrito completo: se la pasamos a onActualizado
function ItemCarrito({ item, onActualizado }) {
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  function ejecutar(accion) {
    setEnviando(true)
    setError('')
    accion()
      .then((carritoActualizado) => {
        onActualizado(carritoActualizado)
        setEnviando(false)
      })
      .catch((fallo) => {
        setError(fallo.message)
        setEnviando(false)
      })
  }

  function cambiar(cantidad, frecuencia) {
    ejecutar(() => actualizarItemCarrito(item.id, cantidad, frecuencia))
  }

  return (
    <li className="tarjeta carrito-item" aria-busy={enviando}>
      <div className="carrito-item-icono" aria-hidden="true"><Wrench size={28} /></div>
      <div className="carrito-item-cuerpo">
        <h3 className="carrito-item-titulo">{item.titulo}</h3>
        <p className="carrito-item-unitario text-secundario">{formatearPrecio(item.precioUnitario)} por servicio</p>
        <div className="carrito-item-controles">
          <StepperCantidad
            valor={item.cantidad}
            maximo={item.cuposDisponibles}
            onChange={(cantidad) => cambiar(cantidad, item.frecuencia)}
            deshabilitado={enviando}
          />
          <SelectorFrecuencia
            id={`frecuencia-${item.id}`}
            valor={item.frecuencia}
            onChange={(frecuencia) => cambiar(item.cantidad, frecuencia)}
            deshabilitado={enviando}
          />
        </div>
        {!item.disponible && (
          <p className="carrito-aviso">
            <TriangleAlert size={16} aria-hidden="true" />
            <span>Este servicio ya no tiene cupo para esa cantidad. Bajá la cantidad o quitalo para poder confirmar.</span>
          </p>
        )}
        <MensajeError>{error}</MensajeError>
      </div>
      <div className="carrito-item-precio">
        <span className="precio">{formatearPrecio(item.subtotal)}</span>
        <button
          type="button"
          className="btn-texto carrito-quitar"
          onClick={() => ejecutar(() => quitarItemCarrito(item.id))}
          disabled={enviando}
          aria-label={`Quitar ${item.titulo} del carrito`}
        >
          Quitar
        </button>
      </div>
    </li>
  )
}

export default ItemCarrito
