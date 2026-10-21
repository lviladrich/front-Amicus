import { ChevronDown } from 'lucide-react'

// Select grande subrayado en amarillo que se lee como parte de la frase. El label va oculto pero presente para lectores de pantalla.
function SelectorFrase({ id, etiqueta, valor, onChange, textoVacio, opciones, cargando = false }) {
  return (
    <span className="selector-frase">
      <label htmlFor={id} className="visually-hidden">{etiqueta}</label>
      <select id={id} value={valor} onChange={(e) => onChange(e.target.value)} disabled={cargando}>
        <option value="">{cargando ? 'Cargando...' : textoVacio}</option>
        {opciones.map((opcion) => (
          <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>
        ))}
      </select>
      <ChevronDown className="selector-flecha" size={28} aria-hidden="true" />
    </span>
  )
}

export default SelectorFrase
