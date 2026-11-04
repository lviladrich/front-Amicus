import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectUsuario } from '../../store/authSlice.js'
import { addToCart } from '../../store/cartSlice.js'
import { formatearPrecio, textoCupos } from '../../utils/formato.js'
import MensajeError from '../comunes/MensajeError.jsx'
import SelectorFrecuencia from './SelectorFrecuencia.jsx'
import SelectorCantidad from './SelectorCantidad.jsx'
import BotonAgregar from './BotonAgregar.jsx'

function PanelCompra({ servicio }) {
  const usuario = useSelector(selectUsuario)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [frecuencia, setFrecuencia] = useState('UNICA')
  const [cantidad, setCantidad] = useState(1)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  async function agregar() {
    if (!usuario) {
      navigate('/login', { state: { desde: location.pathname } })
      return
    }
    setEnviando(true)
    setError('')
    try {
      await dispatch(addToCart({ servicioId: servicio.id, cantidad, frecuencia })).unwrap()
      navigate('/carrito')
    } catch (e) {
      setError(e.mensaje)
      setEnviando(false)
    }
  }

  const bloqueado = !servicio.disponible || enviando

  return (
    <aside className="tarjeta panel-compra p-4" aria-label="Contratar servicio">
      <p className="precio fs-2 mb-1">{formatearPrecio(servicio.precio)}</p>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-secundario small">por servicio</span>
        {servicio.disponible
          ? <span className="etiqueta-cupos">{textoCupos(servicio.cuposDisponibles)}</span>
          : <span className="text-secundario small">Sin cupos</span>}
      </div>
      <SelectorFrecuencia valor={frecuencia} onChange={setFrecuencia} deshabilitado={bloqueado} />
      <SelectorCantidad
        valor={cantidad}
        maximo={servicio.cuposDisponibles}
        onChange={setCantidad}
        deshabilitado={bloqueado}
      />
      <p className="d-flex justify-content-between align-items-baseline border-top pt-3 mb-3">
        <span className="text-secundario">Total</span>
        <strong className="precio fs-4">{formatearPrecio(servicio.precio * cantidad)}</strong>
      </p>
      <BotonAgregar onClick={agregar} disponible={servicio.disponible} enviando={enviando} />
      <div className="mt-3">
        <MensajeError>{error}</MensajeError>
      </div>
      <p className="text-secundario small text-center mt-3 mb-0">
        Coordinás el día y horario con el profesional después de confirmar.
      </p>
    </aside>
  )
}

export default PanelCompra
