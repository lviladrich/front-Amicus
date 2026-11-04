import { ArrowUpDown } from 'lucide-react'

const ORDENES = [
  { valor: 'titulo', etiqueta: 'Nombre (A-Z)' },
  { valor: 'precio-asc', etiqueta: 'Menor precio' },
  { valor: 'precio-desc', etiqueta: 'Mayor precio' },
  { valor: 'nuevos', etiqueta: 'Más nuevos' },
]

function SelectorOrden({ valor, onChange }) {
  return (
    <label className="selector-orden">
      <ArrowUpDown size={14} aria-hidden="true" />
      <span className="visually-hidden">Ordenar por</span>
      <select value={valor} onChange={(evento) => onChange(evento.target.value)}>
        {ORDENES.map((orden) => (
          <option key={orden.valor} value={orden.valor}>{orden.etiqueta}</option>
        ))}
      </select>
    </label>
  )
}

export default SelectorOrden
