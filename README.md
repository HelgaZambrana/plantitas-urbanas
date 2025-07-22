# Plantitas Urbanas 🌿

Sitio web simple para un emprendimiento de venta de plantas de interior y suculentas.

## 📌 Características

- HTML5 semántico
- CSS3 con diseño responsive (Flexbox + Grid)
- Fuentes personalizadas desde Google Fonts
- Renderizado dinámico de productos desde API local (`plantas.json`)
- Carrito de compras funcional con:
  - Agregar productos
  - Editar cantidad
  - Eliminar productos
  - Vaciar carrito
  - Finalizar compra
- Uso de `localStorage` para persistir el carrito
- Diseño responsive adaptable a móviles
- Formulario de contacto funcional (con [Formspree](https://formspree.io/))
- Video embebido (YouTube)
- SEO básico y accesibilidad mejorada

## 📁 Estructura

- `index.html`: Página principal.
- `styles.css`: Estilos externos.
- `script.js`: Lógica JS, carrito y API.
- `/img/`: Carpeta para imágenes de productos y banner.
- `README.md`: Documentación.

## 🌐 Visualización

El deploy del sitio fue realizado en GitHub Pages.

**URL del sitio:** [Plantitas Urbanas](https://helgazambrana.github.io/plantitas-urbanas/)

## 🔧 Tecnologías utilizadas

- HTML5
- CSS3 (Flexbox, Grid, Media Queries)
- JavaScript (DOM, Fetch API, Eventos)
- Google Fonts
- Formspree
- LocalStorage
- Git & GitHub Pages

## 🛒 Funcionalidad del Carrito

- Agrega productos dinámicamente desde `plantas.json`
- Muestra tarjetas con título, imagen, precio
- Botón “Agregar al carrito” para cada producto
- Contador dinámico de productos en el carrito
- Carrito fijo visible (o flotante en mobile)
- Renderizado dinámico del carrito desde `localStorage`
- Edición de cantidad con input numérico
- Eliminación individual de ítems
- Botón “Vaciar carrito”
- Botón “Finalizar compra” (simula compra y limpia carrito)

## ♿ Accesibilidad y SEO

- Etiquetas `alt` en imágenes
- Navegación por teclado
- Etiquetas `aria-label` y estructura semántica
- Uso de `meta` etiquetas (description, keywords, author)