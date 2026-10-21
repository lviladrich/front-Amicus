import { Link } from 'react-router-dom'

function Migas({ categoria, titulo }) {
  return (
    <nav aria-label="Migas de pan" className="migas">
      <ol>
        <li><Link to="/">Inicio</Link></li>
        <li>{categoria}</li>
        <li aria-current="page">{titulo}</li>
      </ol>
    </nav>
  )
}

export default Migas
