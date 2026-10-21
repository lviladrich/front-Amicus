import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { obtenerServicio } from '../api/amicus.js'
import Cargando from '../components/comunes/Cargando.jsx'
import MensajeError from '../components/comunes/MensajeError.jsx'
import Migas from '../components/detalle/Migas.jsx'
import GaleriaImagenes from '../components/detalle/GaleriaImagenes.jsx'
import TarjetaProfesional from '../components/detalle/TarjetaProfesional.jsx'
import ListaZonas from '../components/detalle/ListaZonas.jsx'
import ListaResenas from '../components/detalle/ListaResenas.jsx'
import PanelCompra from '../components/detalle/PanelCompra.jsx'
import '../styles/detalle.css'

function DetalleServicio() {
  const { id } = useParams()
  const [intento, setIntento] = useState(0)
  // La respuesta guarda la clave del pedido que la origino: si no coincide con la actual, esta cargando
  const [respuesta, setRespuesta] = useState(null)
  const clave = `${id}|${intento}`

  useEffect(() => {
    let vigente = true
    obtenerServicio(id)
      .then((servicio) => {
        if (vigente) setRespuesta({ clave, servicio })
      })
      .catch((error) => {
        if (vigente) setRespuesta({ clave, error })
      })
    return () => {
      vigente = false
    }
  }, [id, clave])

  let contenido
  if (respuesta?.clave !== clave) {
    contenido = <Cargando texto="Cargando servicio..." />
  } else if (respuesta.error?.estado === 404) {
    contenido = (
      <div className="py-4">
        <h1 className="h3">No encontramos este servicio</h1>
        <p className="text-secundario">Puede que ya no esté publicado o que el link sea incorrecto.</p>
        <Link to="/" className="btn-amicus">Volver al inicio</Link>
      </div>
    )
  } else if (respuesta.error) {
    contenido = <MensajeError onReintentar={() => setIntento(intento + 1)}>{respuesta.error.message}</MensajeError>
  } else {
    const { servicio } = respuesta
    contenido = (
      <>
        <Migas categoria={servicio.categoria.nombre} titulo={servicio.titulo} />
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <GaleriaImagenes imagenes={servicio.imagenes} categoria={servicio.categoria.nombre} titulo={servicio.titulo} />
            <h1 className="titulo h2 mt-4 mb-0">{servicio.titulo}</h1>
            <TarjetaProfesional
              profesional={servicio.profesional}
              promedio={servicio.promedioPuntaje}
              cantidadResenas={servicio.cantidadResenas}
            />
            <div className="d-flex flex-column gap-4 mt-3">
              <section aria-labelledby="titulo-incluye">
                <h2 id="titulo-incluye" className="h5">Qué incluye</h2>
                <p className="mb-0 descripcion">{servicio.descripcion}</p>
              </section>
              <ListaZonas zonas={servicio.zonas} />
              <ListaResenas
                servicioId={servicio.id}
                promedio={servicio.promedioPuntaje}
                cantidad={servicio.cantidadResenas}
              />
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <PanelCompra servicio={servicio} />
          </div>
        </div>
      </>
    )
  }

  return <div className="container py-4">{contenido}</div>
}

export default DetalleServicio
