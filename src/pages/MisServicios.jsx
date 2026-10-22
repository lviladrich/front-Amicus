import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarMisServicios } from '../api/amicus.js'
import useSesion from '../hooks/useSesion.js'
import Cargando from '../components/comunes/Cargando.jsx'
import MensajeError from '../components/comunes/MensajeError.jsx'
import TarjetaMiServicio from '../components/misServicios/TarjetaMiServicio.jsx'
import '../styles/misServicios.css'

function MisServicios() {
  const { usuario } = useSesion()
  const [intento, setIntento] = useState(0)
  // La respuesta guarda la clave del pedido que la origino: si no coincide con la actual, esta cargando
  const [respuesta, setRespuesta] = useState(null)
  const clave = `${usuario.id}|${intento}`

  useEffect(() => {
    let vigente = true
    listarMisServicios(usuario.id)
      .then((servicios) => {
        if (vigente) setRespuesta({ clave, servicios })
      })
      .catch((error) => {
        if (vigente) setRespuesta({ clave, error: error.message })
      })
    return () => {
      vigente = false
    }
  }, [usuario.id, clave])

  const cargando = respuesta?.clave !== clave

  function alCambiarUnServicio(servicioActualizado) {
    setRespuesta((actual) => ({
      ...actual,
      servicios: actual.servicios.map((s) => (s.id === servicioActualizado.id
        ? { ...s, cuposDisponibles: servicioActualizado.cuposDisponibles, disponible: servicioActualizado.disponible }
        : s)),
    }))
  }

  function alDarDeBaja(servicioId) {
    setRespuesta((actual) => ({
      ...actual,
      servicios: actual.servicios.filter((s) => s.id !== servicioId),
    }))
  }

  let contenido
  if (cargando) {
    contenido = <Cargando texto="Cargando tus servicios..." />
  } else if (respuesta.error) {
    contenido = <MensajeError onReintentar={() => setIntento((i) => i + 1)}>{respuesta.error}</MensajeError>
  } else if (respuesta.servicios.length === 0) {
    contenido = <p className="text-secundario py-4">Todavía no publicaste ningún servicio.</p>
  } else {
    contenido = (
      <ul className="mis-servicios-lista">
        {respuesta.servicios.map((servicio) => (
          <TarjetaMiServicio
            key={servicio.id}
            servicio={servicio}
            onCambioCupos={alCambiarUnServicio}
            onBaja={alDarDeBaja}
          />
        ))}
      </ul>
    )
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Mis servicios</h1>
        <Link to="/mis-servicios/nuevo" className="btn-amicus">Publicar un servicio</Link>
      </div>
      {contenido}
    </div>
  )
}

export default MisServicios
