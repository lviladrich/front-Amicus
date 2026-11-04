import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TriangleAlert } from 'lucide-react'
import { changeItemFrequency, decItem, incItem, removeFromCart } from '../../store/cartSlice.js'
import { formatearPrecio } from '../../utils/formato.js'
import { estiloCategoria } from '../../utils/categorias.js'
import SelectorFrecuencia from './SelectorFrecuencia.jsx'
import StepperCantidad from './StepperCantidad.jsx'
import MensajeError from '../comunes/MensajeError.jsx'

function ItemCarrito({ item }) {
  const dispatch = useDispatch()
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const { fondo, Icono } = estiloCategoria(item.categoria)

  // El store se actualiza solo con el carrito que devuelve el back; aca solo manejamos el error del item
  function ejecutar(accion) {
    setEnviando(true)
    setError('')
    dispatch(accion)
      .unwrap()
      .catch((fallo) => setError(fallo.mensaje))
      .finally(() => setEnviando(false))
  }

  return (
    <li className="tarjeta carrito-item" aria-busy={enviando}>
      <div className="carrito-item-icono" style={{ background: fondo }} aria-hidden="true"><Icono size={28} /></div>
      <div className="carrito-item-cuerpo">
        <h3 className="carrito-item-titulo">{item.titulo}</h3>
        {(item.profesional || item.categoria) && (
          <p className="carrito-item-meta text-secundario">
            {[item.profesional, item.categoria].filter(Boolean).join(', ')}
          </p>
        )}
        <p className="carrito-item-unitario text-secundario">{formatearPrecio(item.precioUnitario)} por servicio</p>
        <div className="carrito-item-controles">
          <StepperCantidad
            valor={item.cantidad}
            maximo={item.cuposDisponibles}
            onChange={(cantidad) => ejecutar(cantidad > item.cantidad ? incItem(item) : decItem(item))}
            deshabilitado={enviando}
          />
          <SelectorFrecuencia
            id={`frecuencia-${item.id}`}
            valor={item.frecuencia}
            onChange={(frecuencia) => ejecutar(changeItemFrequency({ item, frecuencia }))}
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
          onClick={() => ejecutar(removeFromCart(item.id))}
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
