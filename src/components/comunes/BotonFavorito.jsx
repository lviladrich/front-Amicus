import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { selectUsuario } from '../../store/authSlice.js'
import { addFavorito, removeFavorito, selectEsFavorito } from '../../store/favoritosSlice.js'

function BotonFavorito({ servicioId, conTexto = false }) {
  const usuario = useSelector(selectUsuario)
  const activo = useSelector(selectEsFavorito(servicioId))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [enviando, setEnviando] = useState(false)

  function alHacerClic() {
    if (!usuario) {
      navigate('/login', { state: { desde: location.pathname } })
      return
    }
    setEnviando(true)
    dispatch(activo ? removeFavorito(servicioId) : addFavorito(servicioId))
      .finally(() => setEnviando(false))
  }

  const etiqueta = activo ? 'Quitar de favoritos' : 'Guardar en favoritos'

  return (
    <button
      type="button"
      className={`boton-favorito${activo ? ' boton-favorito-activo' : ''}${conTexto ? ' boton-favorito-texto' : ''}`}
      aria-pressed={activo}
      aria-label={conTexto ? undefined : etiqueta}
      title={etiqueta}
      onClick={alHacerClic}
      disabled={enviando}
    >
      <Heart size={18} fill={activo ? 'currentColor' : 'none'} aria-hidden="true" />
      {conTexto && <span>{activo ? 'Guardado' : 'Guardar'}</span>}
    </button>
  )
}

export default BotonFavorito
