import { ShoppingCart } from 'lucide-react'

function BotonAgregar({ onClick, disponible, enviando }) {
  let texto = 'Agregar al carrito'
  if (!disponible) texto = 'Sin cupos'
  else if (enviando) texto = 'Agregando...'

  return (
    <button type="button" className="btn-amicus w-100" onClick={onClick} disabled={!disponible || enviando}>
      {disponible && <ShoppingCart size={16} aria-hidden="true" />}
      {texto}
    </button>
  )
}

export default BotonAgregar
