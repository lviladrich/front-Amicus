// Pasa el detalle de GET /servicios/{id} al formato del resumen del catalogo, que es el que
// usa TarjetaServicio. Sirve para Favoritos y Vistos recientemente, que parten del detalle.
export function resumenDeDetalle(detalle) {
  return {
    id: detalle.id,
    titulo: detalle.titulo,
    precio: detalle.precio,
    cuposDisponibles: detalle.cuposDisponibles,
    disponible: detalle.disponible,
    categoria: detalle.categoria?.nombre ?? '',
    imagenPortada: detalle.imagenes?.[0]?.url ?? null,
    profesional: detalle.profesional ? `${detalle.profesional.nombre} ${detalle.profesional.apellido}` : '',
    zonas: (detalle.zonas ?? []).map((zona) => zona.nombre),
  }
}
