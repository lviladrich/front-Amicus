import { useId } from 'react'
import { FRECUENCIAS } from '../../utils/formato.js'

function SelectorFrecuencia({ valor, onChange, deshabilitado }) {
  const id = useId()

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold small">Frecuencia</label>
      <select id={id} className="form-select" value={valor} onChange={(e) => onChange(e.target.value)} disabled={deshabilitado}>
        {FRECUENCIAS.map((frecuencia) => (
          <option key={frecuencia.valor} value={frecuencia.valor}>{frecuencia.etiqueta}</option>
        ))}
      </select>
    </div>
  )
}

export default SelectorFrecuencia
