import PanelAcceso from '../components/acceso/PanelAcceso.jsx'
import FormularioLogin from '../components/acceso/FormularioLogin.jsx'

function Login() {
  return (
    <PanelAcceso
      titular="Profesionales de tu barrio,"
      destacado="a un clic."
    >
      <FormularioLogin />
    </PanelAcceso>
  )
}

export default Login
