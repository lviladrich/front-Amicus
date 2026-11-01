import PanelAcceso from '../components/acceso/PanelAcceso.jsx'
import FormularioRecuperar from '../components/acceso/FormularioRecuperar.jsx'

function RecuperarPassword() {
  return (
    <PanelAcceso
      titular="Te ayudamos a volver"
      destacado="a tu cuenta."
    >
      <FormularioRecuperar />
    </PanelAcceso>
  )
}

export default RecuperarPassword
