import FormularioPerfil from '../components/perfil/FormularioPerfil.jsx'
import '../styles/acceso.css'
import '../styles/perfil.css'

function Perfil() {
  return (
    <div className="container py-4">
      <div className="tarjeta p-4 perfil-tarjeta">
        <h1 className="h3 mb-1">Mi perfil</h1>
        <p className="text-secundario mb-0">Actualizá tus datos de contacto.</p>
        <FormularioPerfil />
      </div>
    </div>
  )
}

export default Perfil
