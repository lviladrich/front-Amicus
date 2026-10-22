import { useEffect, useState } from 'react'
import { listarCategorias, listarZonas } from '../api/amicus.js'
import BuscadorFrase from '../components/inicio/BuscadorFrase.jsx'
import FiltroCategorias from '../components/inicio/FiltroCategorias.jsx'
import ListaServicios from '../components/ListaServicios.jsx'
import MensajeError from '../components/comunes/MensajeError.jsx'
import '../styles/inicio.css'

function Inicio() {
  const [intento, setIntento] = useState(0)
  // Guarda a que intento corresponde la respuesta: si no coincide, todavia esta cargando
  const [catalogo, setCatalogo] = useState(null)
  // Lo que el usuario va eligiendo en la frase; se aplica a la lista recien al apretar Buscar
  const [categoriaFrase, setCategoriaFrase] = useState('')
  const [zonaFrase, setZonaFrase] = useState('')
  // Filtros aplicados a la lista
  const [categoriaId, setCategoriaId] = useState('')
  const [zonaId, setZonaId] = useState('')

  useEffect(() => {
    let vigente = true
    Promise.all([listarCategorias(), listarZonas()])
      .then(([categorias, zonas]) => {
        if (vigente) setCatalogo({ intento, categorias, zonas })
      })
      .catch((error) => {
        if (vigente) setCatalogo({ intento, error: error.message })
      })
    return () => {
      vigente = false
    }
  }, [intento])

  const cargando = catalogo?.intento !== intento
  const categorias = (!cargando && catalogo.categorias) || []
  const zonas = (!cargando && catalogo.zonas) || []
  const error = !cargando ? catalogo.error : null

  function buscar() {
    setCategoriaId(categoriaFrase)
    setZonaId(zonaFrase)
    document.getElementById('titulo-servicios')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Los chips filtran al instante y dejan la frase en la misma categoria
  function elegirCategoria(id) {
    setCategoriaId(id)
    setCategoriaFrase(id)
  }

  return (
    <>
      <section className="inicio-hero">
        <div className="container py-5">
          <h1 className="visually-hidden">Servicios para el hogar</h1>
          <BuscadorFrase
            categorias={categorias}
            zonas={zonas}
            categoriaId={categoriaFrase}
            onCategoria={setCategoriaFrase}
            zonaId={zonaFrase}
            onZona={setZonaFrase}
            onBuscar={buscar}
            cargando={cargando}
          />
          <div className="mt-3">
            <MensajeError onReintentar={() => setIntento(intento + 1)}>{error}</MensajeError>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <FiltroCategorias categorias={categorias} categoriaId={categoriaId} onElegir={elegirCategoria} />
        <ListaServicios categoriaId={categoriaId} zonaId={zonaId} />
      </section>
    </>
  )
}

export default Inicio
