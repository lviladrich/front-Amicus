import SelectorServicio from './SelectorServicio.jsx'
import SelectorBarrio from './SelectorBarrio.jsx'
import BotonBuscar from './BotonBuscar.jsx'

// TODO (ver docs/PENDIENTES.md): busqueda por texto libre (parametro q)
function BuscadorFrase({ categorias, zonas, categoriaId, onCategoria, zonaId, onZona, onBuscar, cargando }) {
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
    </form>
  )
}

export default BuscadorFrase
