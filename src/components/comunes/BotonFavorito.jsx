import { useLocation, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import useSesion from '../../hooks/useSesion.js'
import useFavoritos from '../../hooks/useFavoritos.js'

function BotonFavorito({ servicioId, conTexto = false }) {
  const { usuario } = useSesion()
  const { esFavorito, alternarFavorito } = useFavoritos()
  const navigate = useNavigate()
  const location = useLocation()
  const activo = esFavorito(servicioId)

  function alHacerClic() {
    if (!usuario) {
      navigate('/login', { state: { desde: location.pathname } })
      return
    }
    alternarFavorito(servicioId)
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
    >
      <Heart size={18} fill={activo ? 'currentColor' : 'none'} aria-hidden="true" />
      {conTexto && <span>{activo ? 'Guardado' : 'Guardar'}</span>}
    </button>
  )
}

export default BotonFavorito
