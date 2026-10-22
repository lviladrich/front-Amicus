import { useEffect, useState } from 'react'
import { eliminarResena, listarResenas, obtenerServicio } from '../../api/amicus.js'
import useSesion from '../../hooks/useSesion.js'
import Cargando from '../comunes/Cargando.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import Paginacion from '../comunes/Paginacion.jsx'
import FormularioResena from './FormularioResena.jsx'
import Resena from './Resena.jsx'

// onResumenActualizado es opcional: DetalleServicio lo usa para refrescar el promedio y la
// cantidad que muestra arriba del todo, sin tener que recargar la pantalla entera.
function ListaResenas({ servicioId, promedio, cantidad, onResumenActualizado }) {
  const { usuario } = useSesion()
  const [pagina, setPagina] = useState(0)
  const [intento, setIntento] = useState(0)
  // La respuesta guarda la clave del pedido que la origino: si no coincide con la actual, esta cargando
  const [respuesta, setRespuesta] = useState(null)
  const clave = `${servicioId}|${pagina}|${intento}`

  useEffect(() => {
    let vigente = true
    listarResenas(servicioId, pagina)
      .then((datos) => {
        if (vigente) setRespuesta({ clave, datos })
      })
      .catch((error) => {
        if (vigente) setRespuesta({ clave, error: error.message })
      })
    return () => {
      vigente = false
    }
  }, [servicioId, pagina, clave])

  // El puntaje y la cantidad que ve DetalleServicio salen del servicio, no de esta lista:
  // hay que volver a pedirlo para que el promedio nuevo se refleje arriba.
  function refrescarResumen() {
    if (!onResumenActualizado) return
    obtenerServicio(servicioId)
      .then((actualizado) => {
        onResumenActualizado({
          promedioPuntaje: actualizado.promedioPuntaje,
          cantidadResenas: actualizado.cantidadResenas,
        })
      })
      .catch(() => {})
  }

  function alCrear() {
    setPagina(0)
    setIntento((actual) => actual + 1)
    refrescarResumen()
  }

  function eliminar(resenaId) {
    return eliminarResena(resenaId).then(() => {
      setIntento((actual) => actual + 1)
      refrescarResumen()
    })
  }

  let contenido
  if (respuesta?.clave !== clave) {
    contenido = <Cargando texto="Cargando reseñas..." />
  } else if (respuesta.error) {
    contenido = <MensajeError onReintentar={() => setIntento(intento + 1)}>{respuesta.error}</MensajeError>
  } else if (respuesta.datos.contenido.length === 0) {
    contenido = <p className="text-secundario">Todavía no hay reseñas para este servicio.</p>
  } else {
    contenido = (
      <>
        <div className="d-flex flex-column gap-2">
          {respuesta.datos.contenido.map((resena) => (
            <Resena
              key={resena.id}
              resena={resena}
              onBorrar={resena.autorId === usuario?.id ? () => eliminar(resena.id) : undefined}
            />
          ))}
        </div>
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
    <section aria-labelledby="titulo-resenas">
      <h2 id="titulo-resenas" className="h5">Reseñas</h2>
      {cantidad > 0 && (
        <p className="mb-3">
          <span className="precio fs-4">{promedio.toLocaleString('es-AR', { maximumFractionDigits: 1 })}</span>
          <span className="text-secundario small"> de 5, según {cantidad === 1 ? '1 reseña' : `${cantidad} reseñas`}</span>
        </p>
      )}
      {usuario && (
        <div className="tarjeta p-3 mb-3">
          <FormularioResena servicioId={servicioId} onCreada={alCrear} />
        </div>
      )}
      {contenido}
    </section>
  )
}

export default ListaResenas
