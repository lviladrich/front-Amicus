import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { obtenerServicio } from '../api/amicus.js'
import useSesion from '../hooks/useSesion.js'
import Cargando from '../components/comunes/Cargando.jsx'
import MensajeError from '../components/comunes/MensajeError.jsx'
import FormularioServicio from '../components/misServicios/FormularioServicio.jsx'
import GestionImagenes from '../components/misServicios/GestionImagenes.jsx'
import '../styles/acceso.css'
import '../styles/misServicios.css'

// Sin :id es "publicar"; con :id es "editar" (carga el servicio existente primero)
function FormularioServicioPage() {
  const { id } = useParams()
  const { usuario } = useSesion()
  const navigate = useNavigate()
  const [servicio, setServicio] = useState(null)
  const [cargando, setCargando] = useState(Boolean(id))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    let vigente = true
    obtenerServicio(id)
      .then((datos) => {
        if (vigente) setServicio(datos)
      })
      .catch((fallo) => {
        if (vigente) setError(fallo.message)
      })
      .finally(() => {
        if (vigente) setCargando(false)
      })
    return () => {
      vigente = false
    }
  }, [id])

  // Se guarda siempre: al publicar, la ruta pasa a /editar pero el componente no se vuelve a montar
  function alGuardar(guardado) {
    setServicio(guardado)
    if (!id) navigate(`/mis-servicios/${guardado.id}/editar`, { replace: true })
  }

  let contenido
  if (cargando) {
    contenido = <Cargando texto="Cargando el servicio..." />
  } else if (error) {
    contenido = <MensajeError>{error}</MensajeError>
  } else if (id && servicio.profesional.id !== usuario.id) {
    contenido = <MensajeError>Este servicio no es tuyo, no lo podés editar.</MensajeError>
  } else {
    contenido = (
      <>
        <FormularioServicio servicio={servicio ?? undefined} onGuardado={alGuardar} />
        {servicio && <GestionImagenes servicio={servicio} onCambio={setServicio} />}
      </>
    )
  }

  return (
    <div className="container py-4">
      <Link to="/mis-servicios" className="btn-texto mb-3 d-inline-block">Volver a Mis servicios</Link>
      <div className="tarjeta p-4 mis-servicios-form-tarjeta">
        <h1 className="h3 mb-3">{id ? 'Editar servicio' : 'Publicar un servicio'}</h1>
        {contenido}
      </div>
    </div>
  )
}

export default FormularioServicioPage
