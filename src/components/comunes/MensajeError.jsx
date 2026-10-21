import { CircleAlert } from 'lucide-react'

// Error de bloque (fallo del back). Para errores de un campo de formulario usar el componente Campo.
function MensajeError({ children, onReintentar }) {
  if (!children) return null
  return (
    <div className="alerta-error" role="alert">
      <CircleAlert size={18} aria-hidden="true" />
      <span className="flex-grow-1">{children}</span>
      {onReintentar && <button type="button" className="btn-texto" onClick={onReintentar}>Reintentar</button>}
    </div>
  )
}

export default MensajeError
