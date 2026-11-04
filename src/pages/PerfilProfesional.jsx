import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { listarServiciosDeProfesional } from '../api/amicus.js'
import Cargando from '../components/comunes/Cargando.jsx'
import MensajeError from '../components/comunes/MensajeError.jsx'
import TarjetaServicio from '../components/TarjetaServicio.jsx'
import { iniciales } from '../utils/formato.js'
import '../styles/inicio.css'
import '../styles/profesional.css'

// Saca los valores repetidos y los ordena alfabeticamente
function unicosOrdenados(valores) {
  return [...new Set(valores)].sort((a, b) => a.localeCompare(b, 'es'))
}

function PerfilProfesional() {
  const { id } = useParams()
  const location = useLocation()
  const [intento, setIntento] = useState(0)
  // La respuesta guarda la clave del pedido que la origino: si no coincide con la actual, esta cargando
  const [respuesta, setRespuesta] = useState(null)
  const clave = `${id}|${intento}`

  useEffect(() => {
    let vigente = true
    listarServiciosDeProfesional(id)
      .then((servicios) => {
        if (vigente) setRespuesta({ clave, servicios })
      })
      .catch((error) => {
        if (vigente) setRespuesta({ clave, error: error.message })
      })
    return () => {
      vigente = false
    }
  }, [id, clave])

  if (respuesta?.clave !== clave) {
    return <div className="container py-4"><Cargando texto="Cargando profesional..." /></div>
  }
  if (respuesta.error) {
    return (
      <div className="container py-4">
        <MensajeError onReintentar={() => setIntento(intento + 1)}>{respuesta.error}</MensajeError>
      </div>
    )
  }

  const { servicios } = respuesta
  // El nombre llega desde el detalle del servicio; si se entra directo por el link, sale del listado
  const nombre = location.state?.nombre ?? servicios[0]?.profesional ?? ''

  if (servicios.length === 0) {
    return (
      <div className="container py-4">
        <h1 className="h3">{nombre || 'Profesional'}</h1>
        <p className="text-secundario">Este profesional no tiene servicios publicados en este momento.</p>
        <Link to="/" className="btn-amicus">Ver otros servicios</Link>
      </div>
    )
  }

  const [primerNombre, ...resto] = nombre.split(' ')
  const categorias = unicosOrdenados(servicios.map((servicio) => servicio.categoria))
  const zonas = unicosOrdenados(servicios.flatMap((servicio) => servicio.zonas ?? []))
  const conCupo = servicios.filter((servicio) => servicio.disponible).length

  return (
    <div className="container py-4">
      <section className="tarjeta perfil-profesional p-4 mb-4" aria-labelledby="titulo-profesional">
        <span className="avatar perfil-profesional-avatar" aria-hidden="true">
          {iniciales({ nombre: primerNombre, apellido: resto.join(' ') })}
        </span>
        <div className="flex-grow-1">
          <h1 id="titulo-profesional" className="h3 mb-1">{nombre}</h1>
          <p className="text-secundario mb-3">
            {servicios.length === 1 ? '1 servicio publicado' : `${servicios.length} servicios publicados`}
            {' · '}
            {conCupo === servicios.length ? 'todos con cupo' : `${conCupo} con cupo`}
          </p>
          <div className="perfil-profesional-datos">
            <div>
              <h2 className="h6">Especialidades</h2>
              <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
                {categorias.map((categoria) => <li key={categoria}><span className="etiqueta">{categoria}</span></li>)}
              </ul>
            </div>
            <div>
              <h2 className="h6">Zonas donde trabaja</h2>
              <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
                {zonas.map((zona) => <li key={zona}><span className="etiqueta">{zona}</span></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <h2 className="h4 mb-3">Servicios de {primerNombre}</h2>
      <div className="row g-3">
        {servicios.map((servicio) => (
          <div key={servicio.id} className="col-12 col-md-6 col-lg-4">
            <TarjetaServicio servicio={servicio} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PerfilProfesional
