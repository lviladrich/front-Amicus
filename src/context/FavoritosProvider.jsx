import { useCallback, useMemo, useState } from 'react'
import { FavoritosContext } from './contextos.js'
import useSesion from '../hooks/useSesion.js'

// Los favoritos se guardan en el navegador (el back no tiene favoritos), uno por usuario,
// para que si dos personas usan la misma compu no se mezclen. Se guardan solo los ids:
// la pantalla de Favoritos pide cada servicio al back para mostrar precio y cupos al dia.
function claveDe(usuario) {
  return usuario ? `amicus.favoritos.${usuario.id}` : null
}

function leerIds(clave) {
  if (!clave) return []
  try {
    const ids = JSON.parse(localStorage.getItem(clave))
    return Array.isArray(ids) ? ids : []
  } catch {
    return []
  }
}

function FavoritosProvider({ children }) {
  const { usuario } = useSesion()
  const clave = claveDe(usuario)
  const [guardados, setGuardados] = useState(() => ({ clave, ids: leerIds(clave) }))

  // Al cambiar de usuario se leen sus favoritos. Se ajusta durante el render, como el reseteo de
  // pagina de ListaServicios, para no mostrar ni un instante los del usuario anterior.
  if (guardados.clave !== clave) {
    setGuardados({ clave, ids: leerIds(clave) })
  }

  const ids = guardados.ids

  const alternarFavorito = useCallback((servicioId) => {
    setGuardados((actual) => {
      if (!actual.clave) return actual
      // El mas reciente va primero
      const nuevos = actual.ids.includes(servicioId)
        ? actual.ids.filter((id) => id !== servicioId)
        : [servicioId, ...actual.ids]
      try {
        localStorage.setItem(actual.clave, JSON.stringify(nuevos))
      } catch {
        // Sin acceso al almacenamiento (modo privado): queda solo en memoria
      }
      return { ...actual, ids: nuevos }
    })
  }, [])

  const valor = useMemo(
    () => ({ favoritos: ids, esFavorito: (id) => ids.includes(id), alternarFavorito }),
    [ids, alternarFavorito],
  )

  return (
    <FavoritosContext.Provider value={valor}>
      {children}
    </FavoritosContext.Provider>
  )
}

export default FavoritosProvider
