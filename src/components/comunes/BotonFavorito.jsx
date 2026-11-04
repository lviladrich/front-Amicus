import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { selectUsuario } from '../../store/authSlice.js'
import { addFavorito, removeFavorito, selectEsFavorito } from '../../store/favoritosSlice.js'

function BotonFavorito({ servicioId, titulo, className = '' }) {
  const usuario = useSelector(selectUsuario)
  const esFavorito = useSelector(selectEsFavorito(servicioId))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [enviando, setEnviando] = useState(false)

  function alternar(evento) {
    // Puede estar dentro de la tarjeta, que es un link: el clic no tiene que abrir el detalle
    evento.preventDefault()
    evento.stopPropagation()
    if (!usuario) {
      navigate('/login', { state: { desde: location.pathname } })
      return
    }
    setEnviando(true)
    dispatch(esFavorito ? removeFavorito(servicioId) : addFavorito(servicioId))
      .finally(() => setEnviando(false))
  }

  return (
    <button
      type="button"
      className={`boton-favorito ${esFavorito ? 'boton-favorito-activo' : ''} ${className}`}
      onClick={alternar}
      disabled={enviando}
      aria-pressed={esFavorito}
      aria-label={esFavorito ? `Quitar ${titulo} de favoritos` : `Guardar ${titulo} en favoritos`}
    >
      <Heart size={18} aria-hidden="true" fill={esFavorito ? 'currentColor' : 'none'} />
    </button>
  )
}

export default BotonFavorito
