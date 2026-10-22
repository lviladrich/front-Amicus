import { useEffect, useState } from 'react'
import { buscarServicios } from '../api/amicus.js'
import TarjetaServicio from './TarjetaServicio.jsx'
import Cargando from './comunes/Cargando.jsx'
import MensajeError from './comunes/MensajeError.jsx'
import Paginacion from './comunes/Paginacion.jsx'

const TAMANIO_PAGINA = 12

function ListaServicios({ categoriaId = '', zonaId = '', texto = '' }) {
  const [paginaActual, setPaginaActual] = useState(0)
  const [conCupo, setConCupo] = useState(false)
  const [intento, setIntento] = useState(0)
  // La respuesta guarda la clave de la busqueda que la origino: si no coincide con la actual, esta cargando
  const [respuesta, setRespuesta] = useState(null)

  // Cualquier cambio de filtro vuelve a la primera pagina. Se ajusta durante el render (no en un
  // efecto aparte) para no provocar un pedido de mas con la pagina vieja antes de resetearla.
  const filtros = `${categoriaId}|${zonaId}|${texto}|${conCupo}`
  const [filtrosAnteriores, setFiltrosAnteriores] = useState(filtros)
  if (filtros !== filtrosAnteriores) {
    setFiltrosAnteriores(filtros)
    setPaginaActual(0)
  }

  const clave = `${filtros}|${paginaActual}|${intento}`

  useEffect(() => {
    let vigente = true
    buscarServicios({ categoriaId, zonaId, q: texto, conCupo, page: paginaActual, size: TAMANIO_PAGINA })
      .then((pagina) => {
        if (vigente) setRespuesta({ clave, pagina })
      })
      .catch((error) => {
        if (vigente) setRespuesta({ clave, error: error.message })
      })
    return () => {
      vigente = false
    }
  }, [categoriaId, zonaId, texto, conCupo, paginaActual, clave])

  const cargando = respuesta?.clave !== clave

  let contenido
  if (cargando) {
    contenido = <Cargando texto="Cargando servicios..." />
  } else if (respuesta.error) {
    contenido = <MensajeError onReintentar={() => setIntento(intento + 1)}>{respuesta.error}</MensajeError>
  } else if (respuesta.pagina.contenido.length === 0) {
    contenido = <p className="text-secundario py-4">No encontramos servicios con esos filtros. Probá con otra categoría, barrio o palabra.</p>
  } else {
    contenido = (
      <>
        <div className="row g-3">
          {respuesta.pagina.contenido.map((servicio) => (
            <div key={servicio.id} className="col-12 col-md-6 col-lg-4">
              <TarjetaServicio servicio={servicio} />
            </div>
          ))}
        </div>
        <Paginacion
          pagina={respuesta.pagina.pagina}
          totalPaginas={respuesta.pagina.totalPaginas}
          esPrimera={respuesta.pagina.esPrimera}
          esUltima={respuesta.pagina.esUltima}
          onCambiar={setPaginaActual}
        />
      </>
    )
  }

  const total = !cargando && !respuesta.error ? respuesta.pagina.totalElementos : null

  return (
    <section aria-labelledby="titulo-servicios">
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 mb-3 gap-2">
        <h2 id="titulo-servicios" className="h4 mb-0">Servicios disponibles</h2>
        <div className="d-flex align-items-center gap-3">
          <label className="switch-cupo">
            <input
              type="checkbox"
              checked={conCupo}
              onChange={(evento) => setConCupo(evento.target.checked)}
            />
            Solo con cupo
          </label>
          {total !== null && (
            <span className="text-secundario small" aria-live="polite">
              {total === 1 ? '1 resultado' : `${total} resultados`}
            </span>
          )}
        </div>
      </div>
      {contenido}
    </section>
  )
}

export default ListaServicios
