// Campos de cada formulario del panel de administracion. Los limites copian las validaciones del back
// (CategoriaRequest y ZonaRequest) para avisar antes de mandar el pedido.
export const CAMPOS_CATEGORIA = [
  { nombre: 'nombre', etiqueta: 'Nombre', requerido: true, maximo: 60 },
  { nombre: 'descripcion', etiqueta: 'Descripción', maximo: 200, ayuda: 'Opcional' },
]

export const CAMPOS_ZONA = [
  { nombre: 'nombre', etiqueta: 'Nombre', requerido: true, maximo: 80 },
]

export function valoresIniciales(campos, item = {}) {
  return Object.fromEntries(campos.map(({ nombre }) => [nombre, item[nombre] ?? '']))
}

// Devuelve { campo: mensaje } solo con los campos que tienen error
export function validar(campos, valores) {
  const errores = {}
  campos.forEach(({ nombre, etiqueta, requerido, maximo }) => {
    const valor = valores[nombre].trim()
    if (requerido && !valor) errores[nombre] = `Completá el campo ${etiqueta.toLowerCase()}.`
    else if (maximo && valor.length > maximo) errores[nombre] = `Usá como máximo ${maximo} caracteres.`
  })
  return errores
}

// Saca espacios de mas y manda null en los opcionales vacios
export function aDatos(campos, valores) {
  return Object.fromEntries(campos.map(({ nombre, requerido }) => {
    const valor = valores[nombre].trim()
    return [nombre, valor || (requerido ? valor : null)]
  }))
}

export function ordenarPorNombre(items) {
  return [...items].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))
}
