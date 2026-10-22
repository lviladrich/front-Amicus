import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cancelarOrden } from '../../api/amicus.js'
import { etiquetaFrecuencia, formatearFecha, formatearPrecio } from '../../utils/formato.js'
import ModalConfirmacion from '../comunes/ModalConfirmacion.jsx'
import MensajeError from '../comunes/MensajeError.jsx'

function textoCantidad(cantidad) {
  return cantidad === 1 ? '1 servicio' : `${cantidad} servicios`
}

// onOrdenActualizada es opcional: si no se pasa, el boton de cancelar simplemente no se muestra
// (por ejemplo si algun dia se reutiliza este componente en un contexto de solo lectura)
function DetalleOrden({ orden, onOrdenActualizada }) {
  const [modalAbierto, setModalAbierto] = useState(false)
  const [cancelando, setCancelando] = useState(false)
  const [error, setError] = useState('')
  const confirmada = orden.estado === 'CONFIRMADA'

  async function confirmarCancelacion() {
    setCancelando(true)
    setError('')
    try {
      const ordenActualizada = await cancelarOrden(orden.id)
      onOrdenActualizada(ordenActualizada)
      setModalAbierto(false)
    } catch (fallo) {
      setError(fallo.message)
    } finally {
      setCancelando(false)
    }
  }

  return (
    <section className="tarjeta detalle-orden" aria-labelledby="titulo-orden">
      <div className="detalle-orden-cabecera">
        <div>
          <h2 id="titulo-orden" className="detalle-orden-titulo">Orden #{orden.id}</h2>
          <p className="text-secundario detalle-orden-fecha">{formatearFecha(orden.fecha)}</p>
        </div>
        <span className="etiqueta">{confirmada ? 'Confirmada' : 'Cancelada'}</span>
      </div>
      <ul className="detalle-orden-items">
        {orden.items.map((item) => (
          <li key={item.id}>
            <div>
              <span>{item.titulo}</span>
              <p className="text-secundario detalle-orden-sub">
                {textoCantidad(item.cantidad)}, {etiquetaFrecuencia(item.frecuencia).toLowerCase()}
              </p>
            </div>
            <span>{formatearPrecio(item.subtotal)}</span>
          </li>
        ))}
      </ul>
      <div className="detalle-orden-total">
        <span className="fw-semibold">{confirmada ? 'Total pagado' : 'Total'}</span>
        <span className="precio">{formatearPrecio(orden.total)}</span>
      </div>
      <MensajeError>{error}</MensajeError>
      <div className="detalle-orden-acciones">
        <Link to="/ordenes" className="btn-texto">Ver mis órdenes</Link>
        {confirmada && onOrdenActualizada && (
          <button
            type="button"
            className="btn-texto detalle-orden-cancelar"
            onClick={() => setModalAbierto(true)}
          >
            Cancelar orden
          </button>
        )}
      </div>
      {modalAbierto && (
        <ModalConfirmacion
          titulo="¿Cancelar esta orden?"
          textoConfirmar="Sí, cancelar"
          confirmando={cancelando}
          onConfirmar={confirmarCancelacion}
          onCancelar={() => setModalAbierto(false)}
        >
          <p className="mb-0">Se van a devolver los cupos a cada servicio contratado. Esta acción no se puede deshacer.</p>
        </ModalConfirmacion>
      )}
    </section>
  )
}

export default DetalleOrden
