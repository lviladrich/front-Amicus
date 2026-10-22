import { useState } from 'react'
import { vaciarCarrito } from '../../api/amicus.js'
import ModalConfirmacion from '../comunes/ModalConfirmacion.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import ItemCarrito from './ItemCarrito.jsx'

function ListaCarrito({ items, onActualizado }) {
  const [modalAbierto, setModalAbierto] = useState(false)
  const [vaciando, setVaciando] = useState(false)
  const [error, setError] = useState('')

  async function confirmarVaciado() {
    setVaciando(true)
    setError('')
    try {
      const carritoVacio = await vaciarCarrito()
      onActualizado(carritoVacio)
      setModalAbierto(false)
    } catch (fallo) {
      setError(fallo.message)
    } finally {
      setVaciando(false)
    }
  }

  return (
    <div>
      <div className="carrito-lista-cabecera">
        <button type="button" className="btn-texto" onClick={() => setModalAbierto(true)}>
          Vaciar carrito
        </button>
      </div>
      <MensajeError>{error}</MensajeError>
      <ul className="carrito-lista" aria-label="Servicios en tu carrito">
        {items.map((item) => (
          <ItemCarrito key={item.id} item={item} onActualizado={onActualizado} />
        ))}
      </ul>
      {modalAbierto && (
        <ModalConfirmacion
          titulo="¿Vaciar el carrito?"
          textoConfirmar="Sí, vaciar"
          confirmando={vaciando}
          onConfirmar={confirmarVaciado}
          onCancelar={() => setModalAbierto(false)}
        >
          <p className="mb-0">Se van a quitar todos los servicios del carrito. Esta acción no se puede deshacer.</p>
        </ModalConfirmacion>
      )}
    </div>
  )
}

export default ListaCarrito
