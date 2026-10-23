import { useState } from 'react'
import Campo from '../acceso/Campo.jsx'
import MensajeError from '../comunes/MensajeError.jsx'
import { aDatos, validar, valoresIniciales } from './camposAdmin.js'

// Formulario de alta o de edicion de una categoria o zona.
// onEnviar recibe los datos limpios y devuelve una promesa; si falla, se muestra el error del back.
function FormularioAdmin({ id, campos, item, textoEnviar, onEnviar, onCancelar }) {
  const [valores, setValores] = useState(() => valoresIniciales(campos, item))
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)

  function cambiar(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
    setErrores((actuales) => ({ ...actuales, [name]: '' }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    const erroresCliente = validar(campos, valores)
    setErrores(erroresCliente)
    setErrorGeneral('')
    if (Object.keys(erroresCliente).length > 0) return

    setEnviando(true)
    try {
      await onEnviar(aDatos(campos, valores))
      // En el alta se limpia para cargar otra; en la edicion el padre desmonta el formulario
      if (!item) setValores(valoresIniciales(campos))
    } catch (fallo) {
      const erroresBack = fallo.errores ?? {}
      if (Object.keys(erroresBack).length > 0) setErrores(erroresBack)
      else setErrorGeneral(fallo.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="admin-form" onSubmit={enviar} noValidate>
      <div className="admin-form-campos">
        {campos.map(({ nombre, etiqueta, ayuda, maximo }, posicion) => (
          <Campo
            key={nombre}
            // Al abrir la edicion, el cursor queda en el primer campo
            autoFocus={Boolean(item) && posicion === 0}
            id={`${id}-${nombre}`}
            name={nombre}
            etiqueta={etiqueta}
            ayuda={ayuda}
            maxLength={maximo}
            value={valores[nombre]}
            onChange={cambiar}
            error={errores[nombre]}
            disabled={enviando}
          />
        ))}
      </div>
      <div className="admin-form-acciones">
        <button type="submit" className="btn-amicus" disabled={enviando}>
          {enviando ? 'Guardando...' : textoEnviar}
        </button>
        {onCancelar && (
          <button type="button" className="btn-amicus btn-amicus-borde" onClick={onCancelar} disabled={enviando}>
            Cancelar
          </button>
        )}
      </div>
      <MensajeError>{errorGeneral}</MensajeError>
    </form>
  )
}

export default FormularioAdmin
