import '../styles/informacion.css'

function Terminos() {
  return (
    <div className="container py-4">
      <div className="tarjeta p-4 info-tarjeta">
        <h1 className="h3 mb-1">Términos y condiciones</h1>
        <p className="text-secundario info-actualizado">Última actualización: octubre de 2026</p>

        <h2>1. Qué es Amicus</h2>
        <p>
          Amicus es un marketplace que conecta a personas que necesitan servicios para el hogar con profesionales que
          los ofrecen. Amicus no presta los servicios: cada profesional es responsable de los que publica.
        </p>

        <h2>2. Cuentas</h2>
        <p>
          Para comprar, dejar reseñas o publicar servicios tenés que crear una cuenta con datos reales y mantenerlos
          actualizados. Sos responsable de cuidar tu contraseña y de lo que se haga con tu cuenta.
        </p>

        <h2>3. Compras y cancelaciones</h2>
        <p>
          Al confirmar el carrito se genera una orden con los servicios, cantidades, frecuencias y precios de ese
          momento. Podés cancelar una orden desde "Mis órdenes". La contratación queda sujeta a los cupos que el
          profesional tenga disponibles.
        </p>

        <h2>4. Publicación de servicios</h2>
        <p>
          Quien publica un servicio se compromete a describirlo con información verdadera, indicar precios y zonas
          correctos y mantener actualizados sus cupos. Amicus puede quitar publicaciones que no cumplan estas reglas.
        </p>

        <h2>5. Reseñas</h2>
        <p>
          Las reseñas tienen que reflejar una experiencia real con el servicio. No se permiten contenidos ofensivos,
          engañosos o ajenos al servicio reseñado.
        </p>

        <h2>6. Datos personales</h2>
        <p>
          Usamos tus datos solo para que puedas usar la plataforma: identificarte, gestionar tus órdenes y mostrar tu
          nombre en tus publicaciones y reseñas.
        </p>

        <h2>7. Cambios en estos términos</h2>
        <p className="mb-0">
          Podemos actualizar estos términos. Si seguís usando Amicus después de un cambio, aceptás la versión nueva.
        </p>
      </div>
    </div>
  )
}

export default Terminos
