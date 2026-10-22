import { useParams } from 'react-router-dom'
import OrdenConfirmada from '../components/confirmacion/OrdenConfirmada.jsx'
import '../styles/confirmacion.css'

// Misma vista que la confirmacion de compra (sello + detalle + cancelar), para ver
// una orden vieja desde "Mis ordenes" en vez de desde el flujo de checkout
function DetalleOrdenPage() {
  const { id } = useParams()
  return (
    <div className="container confirmacion">
      <OrdenConfirmada key={id} id={id} />
    </div>
  )
}

export default DetalleOrdenPage
