import { useContext } from 'react'
import { FavoritosContext } from '../context/contextos.js'

// { favoritos: [ids], esFavorito(id), alternarFavorito(id) } -> sin sesion, favoritos es []
export default function useFavoritos() {
  return useContext(FavoritosContext)
}
