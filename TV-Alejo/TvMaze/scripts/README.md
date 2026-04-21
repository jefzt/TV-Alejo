# TV-Alejo

# 📺 TVAbeja Explorer

Aplicación web multipágina para explorar series y películas utilizando la API pública de TVMaze. Permite navegar entre resultados, buscar contenido, ver detalles de una serie y gestionar una lista de favoritos persistente.

---

## 👥 Integrantes

- Jefry Leandro
- Felipe Carvajal
- Johan Sebastian

---

## ✅ Funcionalidades implementadas

- Listado de series cargado automáticamente desde la API de TVMaze
- Tarjetas con imagen, nombre, géneros y rating
- Buscador con fetch hacia la API
- Historial de búsquedas recientes con opción de eliminar individual
- Filtro por género desde la barra lateral
- Paginación con botones anterior/siguiente, indicador de página y selector de elementos por página
- Página de detalle con imagen, nombre, resumen, géneros, rating, idioma, estado y fecha de estreno
- Sistema de favoritos con localStorage (sin duplicados)
- Página de favoritos con opción de eliminar
- Mensaje cuando no hay favoritos
- Diseño responsive para móvil y desktop
- Persistencia de favoritos, historial y elementos por página con localStorage

---

## 🗂️ Estructura del proyecto
movie-explorer/

css/
    style.css

scripts/
    main.js
    ui.js
    service.js
    storage.js
    persistance.js
    state.js

img/
    logo.png

index.html
show.html
favorites.html

---

## 🚀 Instrucciones para ejecutar el proyecto

1. Clona el repositorio:
```bash
   git clone https://github.com/jefzt/TV-Alejo.git
```

2. Abre la carpeta del proyecto en Visual Studio Code.

3. Instala la extensión **Live Server**.

4. Haz clic derecho sobre `index.html` y selecciona **Open with Live Server**.

5. La aplicación se abrirá en tu navegador en `http://127.0.0.1:5500`.

---

## 🌐 API utilizada

[TVMaze API](https://api.tvmaze.com)

- `GET /shows` — Lista de series
- `GET /search/shows?q=termino` — Búsqueda de series
- `GET /shows/:id` — Detalle de una serie

## 🌐 Demo en línea

[https://tvabeja.netlify.app/](https://tvabeja.netlify.app/)