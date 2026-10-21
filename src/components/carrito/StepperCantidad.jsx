import { Minus, Plus } from 'lucide-react'

function StepperCantidad({ valor, minimo = 1, maximo, onChange, deshabilitado }) {
  const enMaximo = maximo !== undefined && valor >= maximo
  return (
    <div className="carrito-stepper" role="group" aria-label="Cantidad">
      <button
        type="button"
        aria-label="Quitar una unidad"
        onClick={() => onChange(valor - 1)}
        disabled={deshabilitado || valor <= minimo}
      >
        <Minus size={14} aria-hidden="true" />
      </button>
      <output aria-live="polite">{valor}</output>
      <button
        type="button"
        aria-label="Agregar una unidad"
        onClick={() => onChange(valor + 1)}
        disabled={deshabilitado || enMaximo}
      >
        <Plus size={14} aria-hidden="true" />
      </button>
    </div>
  )
}

export default StepperCantidad
