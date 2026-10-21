import { Wrench, Zap, Paintbrush, Sparkles, Hammer, Leaf, Flame, Snowflake, KeyRound, Truck, House } from 'lucide-react'

// Color de fondo e icono propios de cada categoria (segun la maqueta)
const ESTILOS = {
  plomeria: { fondo: '#D6E4EE', Icono: Wrench },
  electricidad: { fondo: '#F6E3B4', Icono: Zap },
  pintura: { fondo: '#E9DDEC', Icono: Paintbrush },
  limpieza: { fondo: '#DCE9E2', Icono: Sparkles },
  carpinteria: { fondo: '#EBE0D4', Icono: Hammer },
  jardineria: { fondo: '#FFFFFF', Icono: Leaf },
  gas: { fondo: '#F8DDD3', Icono: Flame },
  'aire acondicionado': { fondo: '#DDEBF3', Icono: Snowflake },
  cerrajeria: { fondo: '#E6E6E1', Icono: KeyRound },
  mudanzas: { fondo: '#EFE6D0', Icono: Truck },
}

const ESTILO_POR_DEFECTO = { fondo: '#DCE9E2', Icono: House }

function normalizar(texto = '') {
  // Saca los acentos: NFD separa la letra del diacrítico y el rango ̀-ͯ son los diacríticos
  return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
}

export function estiloCategoria(nombreCategoria) {
  return ESTILOS[normalizar(nombreCategoria)] ?? ESTILO_POR_DEFECTO
}
