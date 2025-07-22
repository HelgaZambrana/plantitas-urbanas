// ==============================
// Variables globales
// ==============================
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// ==============================
// Esperar que el DOM cargue
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  fetchProductos();
  actualizarContador();
  validarFormulario();
});

// ==============================
// Fetch API: obtener productos
// ==============================
function fetchProductos() {
  fetch('https://fakestoreapi.com/products?limit=6')
    .then(res => res.json())
    .then(data => mostrarProductos(data))
    .catch(err => console.error('Error al cargar productos:', err));
}

// ==============================
// Mostrar productos en el DOM
// ==============================
function mostrarProductos(productos) {
  const contenedor = document.querySelector('.productos-grid');
  contenedor.innerHTML = '';

  productos.forEach(prod => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.title}" />
      <h3>${prod.title}</h3>
      <p>${prod.description.substring(0, 80)}...</p>
      <p class="precio">$${prod.price.toFixed(2)}</p>
      <button class="agregar-carrito" data-id="${prod.id}" data-title="${prod.title}" data-price="${prod.price}" data-img="${prod.image}">
        Agregar al carrito
      </button>
    `;
    contenedor.appendChild(card);
  });
}

// ==============================
// Agregar al carrito
// ==============================
document.addEventListener('click', e => {
  if (e.target.classList.contains('agregar-carrito')) {
    const btn = e.target;
    const id = btn.dataset.id;
    const titulo = btn.dataset.title;
    const precio = parseFloat(btn.dataset.price);
    const img = btn.dataset.img;

    const existente = carrito.find(item => item.id === id);
    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({ id, titulo, precio, img, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
  }
});

// ==============================
// Actualizar contador
// ==============================
function actualizarContador() {
  const contador = document.getElementById('contador-carrito');
  if (contador) {
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = total;
  }
}

// ==============================
// Validar formulario de contacto
// ==============================
function validarFormulario() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', e => {
    const email = form.querySelector('input[type="email"]').value.trim();
    const nombre = form.querySelector('input[name="nombre"]').value.trim();
    const mensaje = form.querySelector('textarea[name="mensaje"]').value.trim();

    if (!nombre || !email || !mensaje || !email.includes('@')) {
      e.preventDefault();
      alert('Por favor completá correctamente todos los campos.');
    }
  });
}