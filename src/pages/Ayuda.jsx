import { Link } from 'react-router-dom'
import '../styles/informacion.css'

const PREGUNTAS = [
  {
    pregunta: '¿Cómo contrato un servicio?',
    respuesta: 'Buscá el servicio desde el inicio (por texto, categoría o barrio), entrá al detalle, elegí la cantidad y la frecuencia y tocá "Agregar al carrito". Después confirmá la compra desde el carrito.',
  },
  {
    pregunta: '¿Necesito una cuenta?',
    respuesta: 'Podés buscar y ver servicios sin cuenta. Para agregar al carrito, comprar, dejar reseñas o publicar tus propios servicios tenés que iniciar sesión o crear una cuenta.',
  },
  {
    pregunta: '¿Qué significa la frecuencia?',
    respuesta: 'Es cada cuánto querés el servicio: una única vez, semanal, quincenal o mensual. La podés cambiar desde el carrito antes de confirmar.',
  },
  {
    pregunta: '¿Qué son los cupos?',
    respuesta: 'Cada profesional indica cuántos servicios puede tomar. Si un servicio no tiene cupo suficiente para la cantidad que pediste, el carrito te avisa y no te deja confirmar hasta que bajes la cantidad o lo quites.',
  },
  {
    pregunta: '¿Puedo cancelar una orden?',
    respuesta: 'Sí. Desde "Mis órdenes" entrá a la orden y tocá "Cancelar orden". La orden queda en estado cancelada.',
  },
  {
    pregunta: '¿Cómo dejo una reseña?',
    respuesta: 'Con la sesión iniciada, entrá al detalle del servicio y completá el formulario de reseñas con un puntaje de 1 a 5 y, si querés, un comentario. Podés borrar tus propias reseñas.',
  },
  {
    pregunta: '¿Cómo publico mis servicios?',
    respuesta: 'Desde el menú de usuario entrá a "Mis servicios" y tocá "Publicar un servicio". Ahí también podés editarlos, cambiar los cupos y subir fotos.',
  },
]

function Ayuda() {
  return (
    <div className="container py-4">
      <div className="tarjeta p-4 info-tarjeta">
        <h1 className="h3 mb-1">Ayuda</h1>
        <p className="text-secundario">Respuestas a las preguntas más comunes sobre Amicus.</p>

        <h2>Preguntas frecuentes</h2>
        {PREGUNTAS.map(({ pregunta, respuesta }) => (
          <details key={pregunta} className="ayuda-pregunta">
            <summary>{pregunta}</summary>
            <p>{respuesta}</p>
          </details>
        ))}

        <h2>¿Algo más?</h2>
        <p className="mb-0">
          Revisá también los <Link to="/terminos">Términos y condiciones</Link> para saber cómo funciona el uso de
          la plataforma.
        </p>
      </div>
    </div>
  )
}

export default Ayuda
