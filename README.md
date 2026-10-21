# front-Amicus

Front de Amicus, el marketplace de servicios del hogar del Grupo 1 (Aplicaciones Interactivas, UADE).
React + Vite + React Router + Bootstrap. El back está en [back-Amicus](https://github.com/lviladrich/back-Amicus).

## Cómo correrlo

1. Levantar el back (`http://localhost:8080`, ver su README).
2. En este repo:

```bash
npm install
npm run dev     # http://localhost:5173
npm run lint
npm run build
```

Usuario de prueba del back: `admin@amicus.com` / `admin123`, o crear uno desde "Crear cuenta".

## Pantallas

| Ruta | Pantalla | Sesión |
|---|---|---|
| `/` | Inicio: buscador, categorías y servicios | No |
| `/servicios/:id` | Detalle del servicio y panel de compra | No (para agregar al carrito, sí) |
| `/login`, `/registro` | Acceso | No |
| `/carrito` | Carrito | Sí |
| `/ordenes/:id/confirmacion` | Confirmación de compra | Sí |

## Estructura

```
src/
  api/amicus.js         todas las llamadas al back (contrato en docs/API.md)
  context/              sesión (token y usuario) y carrito (para el contador del header)
  hooks/                useSesion, useCarrito
  components/
    layout/             Header, Footer, Logo, BotonCarrito, MenuUsuario
    comunes/            Cargando, MensajeError, RutaPrivada
    inicio/ detalle/ acceso/ carrito/ confirmacion/   componentes de cada pantalla
  pages/                una página por ruta
  styles/               amicus.css (paleta y clases comunes) + un css por pantalla
  utils/                formato de precios y fechas, colores e íconos por categoría
docs/
  API.md                endpoints que usa el front
  PENDIENTES.md         lo que falta, dividido en tareas
```

## Lo que falta

Ver [docs/PENDIENTES.md](docs/PENDIENTES.md).
