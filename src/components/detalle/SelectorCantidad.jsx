import { Minus, Plus } from 'lucide-react'

function SelectorCantidad({ valor, maximo, onChange, deshabilitado }) {
  return (
    <div className="mb-3">
      <span id="etiqueta-cantidad" className="form-label fw-semibold small d-block">Cantidad</span>
      <div className="stepper" role="group" aria-labelledby="etiqueta-cantidad">
        <button
          type="button"
          aria-label="Restar una"
          onClick={() => onChange(valor - 1)}
          disabled={deshabilitado || valor <= 1}
        >
          <Minus size={16} aria-hidden="true" />
        </button>
        <output aria-live="polite">{valor}</output>
        <button
          type="button"
          aria-label="Sumar una"
          onClick={() => onChange(valor + 1)}
          disabled={deshabilitado || valor >= maximo}
        >
          <Plus size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default SelectorCantidad
