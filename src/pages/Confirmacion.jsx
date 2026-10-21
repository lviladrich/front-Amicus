import { useParams } from 'react-router-dom'
import OrdenConfirmada from '../components/confirmacion/OrdenConfirmada.jsx'
import '../styles/confirmacion.css'

function Confirmacion() {
  const { id } = useParams()
  return (
    <div className="container confirmacion">
      <OrdenConfirmada key={id} id={id} />
    </div>
  )
}

export default Confirmacion
