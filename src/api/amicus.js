// Todas las llamadas al back pasan por aca. Los endpoints estan documentados en docs/API.md
const API_URL = 'http://localhost:8080/api'
const CLAVE_TOKEN = 'amicus.token'

export function guardarToken(token) {
  if (token) localStorage.setItem(CLAVE_TOKEN, token)
  else localStorage.removeItem(CLAVE_TOKEN)
}

export function leerToken() {
  return localStorage.getItem(CLAVE_TOKEN)
}

// Error con el formato de RespuestaError del back: { estado, mensaje, errores: { campo: mensaje } }
export class ErrorApi extends Error {
  constructor(estado, mensaje, errores = {}) {
    super(mensaje)
    this.estado = estado
    this.errores = errores
  }
}

async function pedir(ruta, { metodo = 'GET', cuerpo } = {}) {
  const headers = {}
  const token = leerToken()
  if (token) headers.Authorization = `Bearer ${token}`
  if (cuerpo !== undefined) headers['Content-Type'] = 'application/json'

  let respuesta
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      method: metodo,
      headers,
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    })
  } catch {
    throw new ErrorApi(0, 'No pudimos conectarnos con el servidor. Revisá que el back esté prendido.')
  }

  if (!respuesta.ok) {
    const datos = await respuesta.json().catch(() => ({}))
    throw new ErrorApi(
      respuesta.status,
      datos.mensaje || `Error ${respuesta.status} al pedir ${ruta}`,
      datos.errores || {},
    )
  }
  if (respuesta.status === 204) return null
  return respuesta.json()
}

// ---------- Servicios ----------
// filtros: { categoriaId, zonaId, q, conCupo, page, size }
export async function listarServicios(filtros = {}) {
  const pagina = await buscarServicios(filtros)
  return pagina.contenido
}

export function buscarServicios(filtros = {}) {
  const params = new URLSearchParams()
  Object.entries(filtros).forEach(([clave, valor]) => {
    if (valor !== undefined && valor !== null && valor !== '') params.append(clave, valor)
  })
  const consulta = params.toString()
  return pedir(`/servicios${consulta ? `?${consulta}` : ''}`)
}

export function obtenerServicio(id) {
  return pedir(`/servicios/${id}`)
}

export function listarResenas(servicioId, pagina = 0) {
  return pedir(`/servicios/${servicioId}/resenas?page=${pagina}`)
}

// ---------- Categorias y zonas ----------
export function listarCategorias() {
  return pedir('/categorias')
}

export function listarZonas() {
  return pedir('/zonas')
}

// ---------- Autenticacion ----------
export function login(email, password) {
  return pedir('/auth/login', { metodo: 'POST', cuerpo: { email, password } })
}

// datos: { username, email, password, nombre, apellido }
export function registrar(datos) {
  return pedir('/auth/registro', { metodo: 'POST', cuerpo: datos })
}

// ---------- Carrito (requiere sesion) ----------
export function verCarrito() {
  return pedir('/carrito')
}

export function agregarAlCarrito(servicioId, cantidad, frecuencia) {
  return pedir('/carrito/items', { metodo: 'POST', cuerpo: { servicioId, cantidad, frecuencia } })
}

export function actualizarItemCarrito(itemId, cantidad, frecuencia) {
  return pedir(`/carrito/items/${itemId}`, { metodo: 'PUT', cuerpo: { cantidad, frecuencia } })
}

export function quitarItemCarrito(itemId) {
  return pedir(`/carrito/items/${itemId}`, { metodo: 'DELETE' })
}

export function confirmarCompra() {
  return pedir('/carrito/checkout', { metodo: 'POST' })
}

// ---------- Ordenes (requiere sesion) ----------
export function obtenerOrden(id) {
  return pedir(`/ordenes/${id}`)
}
