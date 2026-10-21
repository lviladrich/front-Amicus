import { useEffect, useState } from 'react'
import { listarResenas } from '../../api/amicus.js'
import Cargando from '../comunes/Cargando.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import Resena from './Resena.jsx'

// TODO (ver docs/PENDIENTES.md): crear y eliminar reseñas, y paginarlas (hoy solo se ve la primera pagina)
function ListaResenas({ servicioId, promedio, cantidad }) {
  const [intento, setIntento] = useState(0)
  // La respuesta guarda la clave del pedido que la origino: si no coincide con la actual, esta cargando
  const [respuesta, setRespuesta] = useState(null)
  const clave = `${servicioId}|${intento}`

  useEffect(() => {
    let vigente = true
    listarResenas(servicioId)
      .then((pagina) => {
        if (vigente) setRespuesta({ clave, resenas: pagina.contenido })
      })
      .catch((error) => {
        if (vigente) setRespuesta({ clave, error: error.message })
      })
    return () => {
      vigente = false
    }
  }, [servicioId, clave])

  let contenido
  if (respuesta?.clave !== clave) {
    contenido = <Cargando texto="Cargando reseñas..." />
  } else if (respuesta.error) {
    contenido = <MensajeError onReintentar={() => setIntento(intento + 1)}>{respuesta.error}</MensajeError>
  } else if (respuesta.resenas.length === 0) {
    contenido = <p className="text-secundario">Todavía no hay reseñas para este servicio.</p>
  } else {
    contenido = (
      <div className="d-flex flex-column gap-2">
        {respuesta.resenas.map((resena) => <Resena key={resena.id} resena={resena} />)}
      </div>
    )
  }

  return (
    <section aria-labelledby="titulo-resenas">
      <h2 id="titulo-resenas" className="h5">Reseñas</h2>
      {cantidad > 0 && (
        <p className="mb-3">
          <span className="precio fs-4">{promedio.toLocaleString('es-AR', { maximumFractionDigits: 1 })}</span>
          <span className="text-secundario small"> de 5, según {cantidad === 1 ? '1 reseña' : `${cantidad} reseñas`}</span>
        </p>
      )}
      {contenido}
    </section>
  )
}

export default ListaResenas
