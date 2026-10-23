import { useEffect, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { ErrorApi } from '../../api/amicus.js'
import Cargando from '../comunes/Cargando.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import ModalConfirmacion from '../comunes/ModalConfirmacion.jsx'
import FormularioAdmin from './FormularioAdmin.jsx'
import { ordenarPorNombre } from './camposAdmin.js'

// Lista + alta + edicion + baja de un tipo de dato del catalogo (categorias o zonas).
// api: { listar, crear, actualizar, eliminar } de src/api/amicus.js
function SeccionAdmin({ id, titulo, singular, plural, campos, api }) {
  const [intento, setIntento] = useState(0)
  // Igual que en Mis servicios: la respuesta guarda el intento que la origino para saber si esta cargando
  const [respuesta, setRespuesta] = useState(null)
  const [editandoId, setEditandoId] = useState(null)
  const [aEliminar, setAEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const [errorEliminar, setErrorEliminar] = useState('')
  const { listar } = api

  useEffect(() => {
    let vigente = true
    listar()
      .then((items) => {
        if (vigente) setRespuesta({ intento, items: ordenarPorNombre(items) })
      })
      .catch((error) => {
        if (vigente) setRespuesta({ intento, error: error.message })
      })
    return () => {
      vigente = false
    }
  }, [listar, intento])

  const cargando = respuesta?.intento !== intento
  const items = respuesta?.items ?? []

  function reemplazarItems(cambiar) {
    setRespuesta((actual) => ({ ...actual, items: ordenarPorNombre(cambiar(actual.items)) }))
  }

  // El back valida los nombres repetidos al crear pero no al editar categorias (devuelve un error de la base),
  // asi que se chequea aca contra la lista cargada, con el mismo criterio que el back (sin distinguir mayusculas)
  function verificarNombreLibre(nombre, itemId) {
    const repetido = items.find((item) => item.id !== itemId
      && item.nombre.localeCompare(nombre, 'es', { sensitivity: 'base' }) === 0)
    if (repetido) {
      const mensaje = `Ya existe la ${singular} ${repetido.nombre}.`
      throw new ErrorApi(400, mensaje, { nombre: mensaje })
    }
  }

  async function crear(datos) {
    verificarNombreLibre(datos.nombre)
    const nuevo = await api.crear(datos)
    reemplazarItems((actuales) => [...actuales, nuevo])
  }

  async function actualizar(itemId, datos) {
    verificarNombreLibre(datos.nombre, itemId)
    const actualizado = await api.actualizar(itemId, datos)
    reemplazarItems((actuales) => actuales.map((item) => (item.id === itemId ? actualizado : item)))
    setEditandoId(null)
  }

  function pedirEliminar(item) {
    setErrorEliminar('')
    setAEliminar(item)
  }

  async function confirmarEliminar() {
    setEliminando(true)
    try {
      await api.eliminar(aEliminar.id)
      reemplazarItems((actuales) => actuales.filter((item) => item.id !== aEliminar.id))
      setAEliminar(null)
    } catch (fallo) {
      // Por ejemplo: el back no deja borrar una categoria o zona que usa algun servicio
      setErrorEliminar(fallo.message)
      setAEliminar(null)
    } finally {
      setEliminando(false)
    }
  }

  let lista
  if (cargando) {
    lista = <Cargando texto={`Cargando ${plural}...`} />
  } else if (respuesta.error) {
    lista = <MensajeError onReintentar={() => setIntento((i) => i + 1)}>{respuesta.error}</MensajeError>
  } else if (items.length === 0) {
    lista = <p className="text-secundario mb-0">Todavía no hay {plural} cargadas.</p>
  } else {
    lista = (
      <ul className="admin-lista">
        {items.map((item) => (
          <li key={item.id} className="admin-item">
            {editandoId === item.id ? (
              <FormularioAdmin
                id={`${id}-editar-${item.id}`}
                campos={campos}
                item={item}
                textoEnviar="Guardar cambios"
                onEnviar={(datos) => actualizar(item.id, datos)}
                onCancelar={() => setEditandoId(null)}
              />
            ) : (
              <>
                <div className="admin-item-datos">
                  <span className="fw-semibold">{item.nombre}</span>
                  {item.descripcion && <span className="text-secundario small">{item.descripcion}</span>}
                </div>
                <div className="admin-item-acciones">
                  <button
                    type="button"
                    className="btn-texto admin-accion"
                    onClick={() => setEditandoId(item.id)}
                    aria-label={`Editar ${singular} ${item.nombre}`}
                  >
                    <Pencil size={14} aria-hidden="true" />
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn-texto admin-accion admin-accion-eliminar"
                    onClick={() => pedirEliminar(item)}
                    aria-label={`Eliminar ${singular} ${item.nombre}`}
                  >
                    <Trash2 size={14} aria-hidden="true" />
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section className="tarjeta admin-seccion" aria-labelledby={`${id}-titulo`}>
      <div className="admin-seccion-cabecera">
        <h2 id={`${id}-titulo`} className="h5 mb-0">{titulo}</h2>
        {!cargando && !respuesta.error && (
          <span className="text-secundario small">{items.length} {items.length === 1 ? singular : plural}</span>
        )}
      </div>

      <div className="admin-alta">
        <h3 className="admin-alta-titulo">Agregar {singular}</h3>
        <FormularioAdmin id={`${id}-nueva`} campos={campos} textoEnviar="Agregar" onEnviar={crear} />
      </div>

      <MensajeError>{errorEliminar}</MensajeError>
      {lista}

      {aEliminar && (
        <ModalConfirmacion
          titulo={`¿Eliminar la ${singular} "${aEliminar.nombre}"?`}
          textoConfirmar="Sí, eliminar"
          confirmando={eliminando}
          onConfirmar={confirmarEliminar}
          onCancelar={() => setAEliminar(null)}
        >
          <p className="mb-0">No se puede deshacer. Si algún servicio la usa, no se va a poder eliminar.</p>
        </ModalConfirmacion>
      )}
    </section>
  )
}

export default SeccionAdmin
