export function formatearPrecio(valor) {
  return `$${Number(valor ?? 0).toLocaleString('es-AR', { maximumFractionDigits: 2 })}`
}

export function formatearFecha(fechaIso) {
  if (!fechaIso) return ''
  return new Date(fechaIso).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function iniciales(usuario) {
  if (!usuario) return ''
  const nombre = usuario.nombre?.[0] ?? usuario.username?.[0] ?? ''
  const apellido = usuario.apellido?.[0] ?? ''
  return `${nombre}${apellido}`.toUpperCase()
}

export function textoCupos(cupos) {
  if (!cupos) return 'Sin cupos'
  return cupos === 1 ? '1 cupo' : `${cupos} cupos`
}

// Valores del enum Frecuencia del back
export const FRECUENCIAS = [
  { valor: 'UNICA', etiqueta: 'Una sola vez' },
  { valor: 'SEMANAL', etiqueta: 'Semanal' },
  { valor: 'QUINCENAL', etiqueta: 'Quincenal' },
  { valor: 'MENSUAL', etiqueta: 'Mensual' },
]

export function etiquetaFrecuencia(valor) {
  return FRECUENCIAS.find((f) => f.valor === valor)?.etiqueta ?? valor
}
