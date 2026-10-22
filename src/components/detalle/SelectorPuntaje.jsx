import { Star } from 'lucide-react'

// Estrellas clickeables para elegir un puntaje de 1 a 5. Distinto de Estrellas.jsx,
// que solo muestra un puntaje ya puesto (reseñas ajenas, promedio).
function SelectorPuntaje({ valor, onChange, deshabilitado, etiquetadoPor, describidoPor }) {
  return (
    <div
      className="selector-puntaje"
      role="radiogroup"
      aria-labelledby={etiquetadoPor}
      aria-describedby={describidoPor}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={valor === n}
          aria-label={`${n} de 5 estrellas`}
          className="selector-puntaje-boton"
          onClick={() => onChange(n)}
          disabled={deshabilitado}
        >
          <Star size={22} fill={n <= valor ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}

export default SelectorPuntaje
