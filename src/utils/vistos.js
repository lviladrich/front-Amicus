// Servicios vistos recientemente, guardados en el navegador. Se guarda el resumen completo
// (no solo el id) para mostrar la fila del inicio sin pedirle nada al back.
const CLAVE_VISTOS = 'amicus.vistos'
const MAXIMO_VISTOS = 8

export function leerVistos() {
  try {
    const vistos = JSON.parse(localStorage.getItem(CLAVE_VISTOS))
    return Array.isArray(vistos) ? vistos : []
  } catch {
    return []
  }
}

// resumen: el formato de TarjetaServicio (ver resumenDeDetalle en utils/servicios.js)
export function registrarVisto(resumen) {
  const vistos = [resumen, ...leerVistos().filter((s) => s.id !== resumen.id)].slice(0, MAXIMO_VISTOS)
  try {
    localStorage.setItem(CLAVE_VISTOS, JSON.stringify(vistos))
  } catch {
    // Sin acceso al almacenamiento: simplemente no se recuerda
  }
}

export function borrarVistos() {
  try {
    localStorage.removeItem(CLAVE_VISTOS)
  } catch {
    // Nada que hacer
  }
}
