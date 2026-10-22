import { useEffect, useRef } from 'react'

// Dialogo chico para pedir confirmacion antes de una accion que no se puede deshacer.
// El padre controla si esta montado (if (abierto) <ModalConfirmacion .../>): no tiene estado propio de visibilidad.
function ModalConfirmacion({ titulo, children, textoConfirmar = 'Confirmar', confirmando, onConfirmar, onCancelar }) {
  const botonConfirmarRef = useRef(null)

  useEffect(() => {
    botonConfirmarRef.current?.focus()
    function alApretarTecla(evento) {
      if (evento.key === 'Escape') onCancelar()
    }
    document.addEventListener('keydown', alApretarTecla)
    return () => document.removeEventListener('keydown', alApretarTecla)
  }, [onCancelar])

  return (
    <div className="modal-fondo" role="presentation" onClick={onCancelar}>
      <div
        className="modal-caja"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-confirmacion-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <h2 id="modal-confirmacion-titulo" className="modal-titulo">{titulo}</h2>
        <div className="modal-cuerpo">{children}</div>
        <div className="modal-acciones">
          <button type="button" className="btn-amicus btn-amicus-borde" onClick={onCancelar} disabled={confirmando}>
            Cancelar
          </button>
          <button
            type="button"
            ref={botonConfirmarRef}
            className="btn-amicus btn-amicus-peligro"
            onClick={onConfirmar}
            disabled={confirmando}
          >
            {confirmando ? 'Un momento...' : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmacion
