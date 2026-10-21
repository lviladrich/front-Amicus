import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { agregarAlCarrito } from '../../api/amicus.js'
import useSesion from '../../hooks/useSesion.js'
import useCarrito from '../../hooks/useCarrito.js'
import { formatearPrecio, textoCupos } from '../../utils/formato.js'
import MensajeError from '../comunes/MensajeError.jsx'
import SelectorFrecuencia from './SelectorFrecuencia.jsx'
import SelectorCantidad from './SelectorCantidad.jsx'
import BotonAgregar from './BotonAgregar.jsx'

function PanelCompra({ servicio }) {
  const { usuario } = useSesion()
  const { setCarrito } = useCarrito()
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
      const carrito = await agregarAlCarrito(servicio.id, cantidad, frecuencia)
      setCarrito(carrito)
      navigate('/carrito')
    } catch (e) {
      setError(e.message)
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
