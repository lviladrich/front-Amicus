import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchFavoritos, selectFavoritos } from '../store/favoritosSlice.js'
import Cargando from '../components/comunes/Cargando.jsx'
import MensajeError from '../components/comunes/MensajeError.jsx'
import TarjetaServicio from '../components/TarjetaServicio.jsx'
import '../styles/inicio.css'

function MisFavoritos() {
  const dispatch = useDispatch()
  const favoritos = useSelector(selectFavoritos)
  const { estado, error } = useSelector((state) => state.favoritos)
  const [intento, setIntento] = useState(0)

  // Al entrar se vuelve a pedir: un servicio guardado pudo haberse dado de baja
  useEffect(() => {
    dispatch(fetchFavoritos())
  }, [intento, dispatch])

  let contenido
  if (estado === 'cargando' && favoritos.length === 0) contenido = <Cargando texto="Cargando tus favoritos..." />
  else if (estado === 'error') {
    contenido = <MensajeError onReintentar={() => setIntento(intento + 1)}>{error?.mensaje}</MensajeError>
  } else if (favoritos.length === 0) {
    contenido = (
      <div className="py-4">
        <p className="text-secundario">Todavía no guardaste ningún servicio. Tocá el corazón de una tarjeta para tenerlo a mano acá.</p>
        <Link to="/" className="btn-amicus">Ver servicios</Link>
      </div>
    )
  } else {
    contenido = (
      <div className="row g-3">
        {favoritos.map((servicio) => (
          <div key={servicio.id} className="col-12 col-md-6 col-lg-4">
            <TarjetaServicio servicio={servicio} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Mis favoritos</h1>
      {contenido}
    </div>
  )
}

export default MisFavoritos
