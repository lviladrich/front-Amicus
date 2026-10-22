import { ChevronLeft, ChevronRight } from 'lucide-react'

// pagina: numero de pagina actual (base 0, como lo devuelve el back). Si hay una sola pagina no muestra nada.
function Paginacion({ pagina, totalPaginas, esPrimera, esUltima, onCambiar }) {
  if (totalPaginas <= 1) return null
  return (
    <nav className="paginacion" aria-label="Paginación de resultados">
      <button type="button" className="btn-texto" onClick={() => onCambiar(pagina - 1)} disabled={esPrimera}>
        <ChevronLeft size={16} aria-hidden="true" />
        Anterior
      </button>
      <span className="text-secundario small" aria-live="polite">Página {pagina + 1} de {totalPaginas}</span>
      <button type="button" className="btn-texto" onClick={() => onCambiar(pagina + 1)} disabled={esUltima}>
        Siguiente
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  )
}

export default Paginacion
