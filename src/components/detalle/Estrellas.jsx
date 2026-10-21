import { Star } from 'lucide-react'

function Estrellas({ puntaje, size = 16 }) {
  return (
    <span className="estrellas" role="img" aria-label={`${puntaje} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} fill={n <= puntaje ? 'currentColor' : 'none'} aria-hidden="true" />
      ))}
    </span>
  )
}

export default Estrellas
