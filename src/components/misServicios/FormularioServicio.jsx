import { useEffect, useState } from 'react'
import { listarCategorias, listarZonas, publicarServicio, actualizarServicio } from '../../api/amicus.js'
import { validarServicio } from '../acceso/validaciones.js'
import Campo from '../acceso/Campo.jsx'
import ErrorCampo from '../acceso/ErrorCampo.jsx'
import Chip from '../inicio/Chip.jsx'
import Cargando from '../comunes/Cargando.jsx'
import MensajeError from '../comunes/MensajeError.jsx'

const VACIO = { titulo: '', descripcion: '', precio: '', cuposDisponibles: '', categoriaId: '' }

// servicio es undefined para publicar uno nuevo, o un ServicioDetalleResponse para editar uno existente
function FormularioServicio({ servicio, onGuardado }) {
  const [catalogo, setCatalogo] = useState(null)
  const [valores, setValores] = useState(() => servicio
    ? {
      titulo: servicio.titulo,
      descripcion: servicio.descripcion,
      precio: String(servicio.precio),
      cuposDisponibles: String(servicio.cuposDisponibles),
      categoriaId: String(servicio.categoria.id),
    }
    : VACIO)
  const [zonaIds, setZonaIds] = useState(() => new Set((servicio?.zonas ?? []).map((zona) => zona.id)))
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    let vigente = true
    Promise.all([listarCategorias(), listarZonas()])
      .then(([categorias, zonas]) => {
        if (vigente) setCatalogo({ categorias, zonas })
      })
      .catch((error) => {
        if (vigente) setErrorGeneral(error.message)
      })
    return () => {
      vigente = false
    }
  }, [])

  function cambiar(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
    setErrores((actuales) => ({ ...actuales, [name]: '' }))
  }

  function alternarZona(id) {
    setZonaIds((actuales) => {
      const nuevo = new Set(actuales)
      if (nuevo.has(id)) nuevo.delete(id)
      else nuevo.add(id)
      return nuevo
    })
  }

  async function enviar(evento) {
    evento.preventDefault()
    const erroresCliente = validarServicio(valores)
    setErrores(erroresCliente)
    setErrorGeneral('')
    if (Object.keys(erroresCliente).length > 0) return

    setEnviando(true)
    const datos = {
      titulo: valores.titulo.trim(),
      descripcion: valores.descripcion.trim(),
      precio: Number(valores.precio),
      cuposDisponibles: Number(valores.cuposDisponibles),
      categoriaId: Number(valores.categoriaId),
      zonaIds: Array.from(zonaIds),
    }
    try {
      const guardado = servicio
        ? await actualizarServicio(servicio.id, datos)
        : await publicarServicio(datos)
      onGuardado(guardado)
    } catch (error) {
      setErrores(error.errores ?? {})
      setErrorGeneral(error.message)
      setEnviando(false)
    }
  }

  if (!catalogo) {
    return errorGeneral ? <MensajeError>{errorGeneral}</MensajeError> : <Cargando texto="Cargando categorías y zonas..." />
  }

  return (
    <form onSubmit={enviar} noValidate className="acceso-formulario">
      <MensajeError>{errorGeneral}</MensajeError>
      <Campo id="titulo" etiqueta="Título" value={valores.titulo} onChange={cambiar} error={errores.titulo} />
      <div className="campo">
        <label htmlFor="descripcion" className="campo-etiqueta">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          className={`campo-input ${errores.descripcion ? 'campo-input-error' : ''}`}
          rows={4}
          value={valores.descripcion}
          onChange={cambiar}
          aria-invalid={errores.descripcion ? 'true' : 'false'}
          aria-describedby={errores.descripcion ? 'descripcion-error' : undefined}
        />
        <ErrorCampo id="descripcion-error">{errores.descripcion}</ErrorCampo>
      </div>
      <div className="acceso-fila">
        <Campo
          id="precio"
          etiqueta="Precio"
          type="number"
          min="0.01"
          step="0.01"
          value={valores.precio}
          onChange={cambiar}
          error={errores.precio}
        />
        <Campo
          id="cuposDisponibles"
          etiqueta="Cupos disponibles"
          type="number"
          min="0"
          step="1"
          value={valores.cuposDisponibles}
          onChange={cambiar}
          error={errores.cuposDisponibles}
        />
      </div>
      <div className="campo">
        <label htmlFor="categoriaId" className="campo-etiqueta">Categoría</label>
        <select
          id="categoriaId"
          name="categoriaId"
          className={`campo-input ${errores.categoriaId ? 'campo-input-error' : ''}`}
          value={valores.categoriaId}
          onChange={cambiar}
          aria-invalid={errores.categoriaId ? 'true' : 'false'}
          aria-describedby={errores.categoriaId ? 'categoriaId-error' : undefined}
        >
          <option value="">Elegí una categoría</option>
          {catalogo.categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
          ))}
        </select>
        <ErrorCampo id="categoriaId-error">{errores.categoriaId}</ErrorCampo>
      </div>
      <div>
        <span className="campo-etiqueta d-block mb-1">Zonas donde trabajás (opcional)</span>
        <div className="d-flex flex-wrap gap-2">
          {catalogo.zonas.map((zona) => (
            <Chip key={zona.id} activo={zonaIds.has(zona.id)} onClick={() => alternarZona(zona.id)}>
              {zona.nombre}
            </Chip>
          ))}
        </div>
      </div>
      <button type="submit" className="btn-amicus" disabled={enviando}>
        {enviando ? 'Guardando...' : servicio ? 'Guardar cambios' : 'Publicar servicio'}
      </button>
    </form>
  )
}

export default FormularioServicio
