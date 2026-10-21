import { CircleAlert } from 'lucide-react'

// Error de un campo de formulario: color + ícono + texto. El id lo referencia el input con aria-describedby
function ErrorCampo({ id, children }) {
  if (!children) return null
  return (
    <p id={id} className="texto-error campo-error">
      <CircleAlert size={14} aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

export default ErrorCampo
