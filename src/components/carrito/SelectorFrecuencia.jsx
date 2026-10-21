import { FRECUENCIAS } from '../../utils/formato.js'

function SelectorFrecuencia({ id, valor, onChange, deshabilitado }) {
  return (
    <>
      <label htmlFor={id} className="visually-hidden">Frecuencia del servicio</label>
      <select
        id={id}
        className="carrito-select"
        value={valor}
        onChange={(evento) => onChange(evento.target.value)}
        disabled={deshabilitado}
      >
        {FRECUENCIAS.map((frecuencia) => (
          <option key={frecuencia.valor} value={frecuencia.valor}>{frecuencia.etiqueta}</option>
        ))}
      </select>
    </>
  )
}

export default SelectorFrecuencia
