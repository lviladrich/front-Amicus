import { useEffect, useState } from 'react'
import { listarOrdenes } from '../api/amicus.js'
import Cargando from '../components/comunes/Cargando.jsx'
import MensajeError from '../components/comunes/MensajeError.jsx'
import Paginacion from '../components/comunes/Paginacion.jsx'
import TarjetaOrden from '../components/ordenes/TarjetaOrden.jsx'
import '../styles/ordenes.css'

const TAMANIO_PAGINA = 10

function MisOrdenes() {
  const [pagina, setPagina] = useState(0)
  const [intento, setIntento] = useState(0)
  // La respuesta guarda la clave del pedido que la origino: si no coincide con la actual, esta cargando
  const [respuesta, setRespuesta] = useState(null)
  const clave = `${pagina}|${intento}`

  useEffect(() => {
    let vigente = true
    listarOrdenes({ page: pagina, size: TAMANIO_PAGINA })
      .then((datos) => {
        if (vigente) setRespuesta({ clave, datos })
      })
      .catch((error) => {
        if (vigente) setRespuesta({ clave, error: error.message })
      })
    return () => {
      vigente = false
    }
  }, [pagina, clave])

  const cargando = respuesta?.clave !== clave

  let contenido
  if (cargando) {
    contenido = <Cargando texto="Cargando tus órdenes..." />
  } else if (respuesta.error) {
    contenido = <MensajeError onReintentar={() => setIntento(intento + 1)}>{respuesta.error}</MensajeError>
  } else if (respuesta.datos.contenido.length === 0) {
    contenido = <p className="text-secundario py-4">Todavía no hiciste ninguna compra.</p>
  } else {
    contenido = (
      <>
        <ul className="ordenes-lista">
          {respuesta.datos.contenido.map((orden) => <TarjetaOrden key={orden.id} orden={orden} />)}
        </ul>
        <Paginacion
          pagina={respuesta.datos.pagina}
          totalPaginas={respuesta.datos.totalPaginas}
          esPrimera={respuesta.datos.esPrimera}
          esUltima={respuesta.datos.esUltima}
          onCambiar={setPagina}
        />
      </>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Mis órdenes</h1>
      {contenido}
    </div>
  )
}

export default MisOrdenes
