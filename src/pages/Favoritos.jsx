import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerServicio } from '../api/amicus.js'
import useFavoritos from '../hooks/useFavoritos.js'
import Cargando from '../components/comunes/Cargando.jsx'
import TarjetaServicio from '../components/TarjetaServicio.jsx'
import { resumenDeDetalle } from '../utils/servicios.js'
import '../styles/inicio.css'

function Favoritos() {
  const { favoritos } = useFavoritos()
  // Los servicios se piden una sola vez al entrar. Si despues se quita un favorito, la tarjeta
  // se esconde filtrando por la lista actual, sin volver a pedir nada.
  const [idsPedidos] = useState(favoritos)
  const [servicios, setServicios] = useState(null)

  useEffect(() => {
    let vigente = true
    // allSettled y no all: si un servicio ya no existe (404), el resto se muestra igual
    Promise.allSettled(idsPedidos.map((id) => obtenerServicio(id)))
      .then((resultados) => {
        if (!vigente) return
        setServicios(resultados
          .filter((resultado) => resultado.status === 'fulfilled')
          .map((resultado) => resumenDeDetalle(resultado.value)))
      })
    return () => {
      vigente = false
    }
  }, [idsPedidos])

  let contenido
  if (servicios === null) {
    contenido = <Cargando texto="Cargando tus favoritos..." />
  } else {
    const visibles = servicios.filter((servicio) => favoritos.includes(servicio.id))
    contenido = visibles.length === 0 ? (
      <div className="py-4">
        <p className="text-secundario">
          Todavía no guardaste ningún servicio. Tocá el corazón de un servicio para tenerlo a mano acá.
        </p>
        <Link to="/" className="btn-amicus">Ver servicios</Link>
      </div>
    ) : (
      <div className="row g-3">
        {visibles.map((servicio) => (
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

export default Favoritos
