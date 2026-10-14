const API_URL = 'http://localhost:8080/api'

async function pedir(ruta) {
  const respuesta = await fetch(`${API_URL}${ruta}`)
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al pedir ${ruta}`)
  }
  return respuesta.json()
}

export async function listarServicios(categoriaId) {
  const filtro = categoriaId ? `?categoriaId=${categoriaId}` : ''
  const pagina = await pedir(`/servicios${filtro}`)
  return pagina.contenido
}

export function obtenerServicio(id) {
  return pedir(`/servicios/${id}`)
}

export function listarCategorias() {
  return pedir('/categorias')
}
