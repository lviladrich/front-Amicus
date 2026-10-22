import { Search } from 'lucide-react'
import SelectorServicio from './SelectorServicio.jsx'
import SelectorBarrio from './SelectorBarrio.jsx'
import BotonBuscar from './BotonBuscar.jsx'

function BuscadorFrase({ categorias, zonas, categoriaId, onCategoria, zonaId, onZona, texto, onTexto, onBuscar, cargando }) {
  function manejarEnvio(evento) {
    evento.preventDefault()
    onBuscar()
  }

  return (
    <form onSubmit={manejarEnvio}>
      <div className="frase">
        <span>Necesito</span>
        <SelectorServicio categorias={categorias} valor={categoriaId} onChange={onCategoria} cargando={cargando} />
        <span>en</span>
        <SelectorBarrio zonas={zonas} valor={zonaId} onChange={onZona} cargando={cargando} />
      </div>
      <div className="d-flex flex-wrap align-items-center gap-3 mt-4">
        <BotonBuscar />
        <p className="text-secundario small mb-0">
          Elegí qué necesitás y en qué barrio: te mostramos quién lo hace cerca tuyo.
        </p>
      </div>
      <div className="frase-texto-libre">
        <Search size={18} aria-hidden="true" />
        <label htmlFor="busqueda-texto" className="visually-hidden">Buscar por palabra clave</label>
        <input
          id="busqueda-texto"
          type="search"
          placeholder="O buscá por palabra clave, por ejemplo “destapación”"
          value={texto}
          onChange={(evento) => onTexto(evento.target.value)}
          disabled={cargando}
        />
      </div>
    </form>
  )
}

export default BuscadorFrase
