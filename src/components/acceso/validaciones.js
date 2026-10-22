// Espejan las validaciones del back (ver docs/API.md). Devuelven { campo: mensaje } y vacio si todo esta bien.
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validarEmail(email) {
  if (!email.trim()) return 'Ingresá tu email.'
  if (!REGEX_EMAIL.test(email.trim())) return 'El email no parece válido. Revisá que tenga el formato nombre@dominio.com.'
  return ''
}

function validarPassword(password) {
  if (!password) return 'Ingresá tu contraseña.'
  if (password.length < 6) return 'La contraseña es muy corta. Usá al menos 6 caracteres.'
  return ''
}

export function validarLogin({ email, password }) {
  const errores = {}
  const errorEmail = validarEmail(email)
  if (errorEmail) errores.email = errorEmail
  // En el login no avisamos del largo: alcanza con que haya escrito algo
  if (!password) errores.password = 'Ingresá tu contraseña.'
  return errores
}

export function validarRegistro({ nombre, apellido, username, email, password }) {
  const errores = {}
  if (!nombre.trim()) errores.nombre = 'Ingresá tu nombre.'
  if (!apellido.trim()) errores.apellido = 'Ingresá tu apellido.'
  const largo = username.trim().length
  if (largo < 3 || largo > 50) errores.username = 'El usuario debe tener entre 3 y 50 caracteres.'
  const errorEmail = validarEmail(email)
  if (errorEmail) errores.email = errorEmail
  const errorPassword = validarPassword(password)
  if (errorPassword) errores.password = errorPassword
  return errores
}

// PUT /auth/usuarios/{id} no incluye username ni password, asi que no se validan aca
export function validarPerfil({ nombre, apellido, email }) {
  const errores = {}
  if (!nombre.trim()) errores.nombre = 'Ingresá tu nombre.'
  if (!apellido.trim()) errores.apellido = 'Ingresá tu apellido.'
  const errorEmail = validarEmail(email)
  if (errorEmail) errores.email = errorEmail
  return errores
}
