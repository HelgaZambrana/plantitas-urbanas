// ==============================
// Variables globales
// ==============================
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// ==============================
// DOM listo
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  fetchProductos();
  renderizarCarrito();
  actualizarContador();
  validarFormulario();
});

// ==============================
// Fetch API desde dummyjson
// ==============================
function fetchProductos() {
  fetch('https://dummyjson.com/products?limit=6')
    .then(res => res.json())
    .then(data => mostrarProductos(data.products))
    .catch(err => console.error('Error al cargar productos:', err));
}

// ==============================
// Mostrar productos
// ==============================
function mostrarProductos(productos) {
  const contenedor = document.querySelector('.productos-grid');
  contenedor.innerHTML = '';

  productos.forEach(prod => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${prod.thumbnail}" alt="${prod.title}" />
      <h3>${prod.title}</h3>
      <p>${prod.description.substring(0, 80)}...</p>
      <p class="precio">$${prod.price.toFixed(2)}</p>
      <button class="agregar-carrito" data-id="${prod.id}" data-title="${prod.title}" data-price="${prod.price}" data-img="${prod.thumbnail}">
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

    guardarYActualizar();
  }

  if (e.target.id === 'vaciar-carrito') {
    localStorage.removeItem('carrito');
    carrito = [];
    guardarYActualizar();
  }

  if (e.target.id === 'finalizar-compra') {
    localStorage.removeItem('carrito');
    carrito = [];
    guardarYActualizar();
    alert('¡Gracias por tu compra!');
    window.location.href = '#inicio';
  }

  if (e.target.classList.contains('eliminar-item')) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1);
    guardarYActualizar();
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
// Renderizar carrito
// ==============================
function renderizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const total = document.getElementById('total-carrito');
  lista.innerHTML = '';

  let totalCompra = 0;

  carrito.forEach((item, index) => {
    totalCompra += item.precio * item.cantidad;

    const li = document.createElement('li');
    li.innerHTML = `
      <div style="display:flex; align-items:center;">
        <img src="${item.img}" alt="${item.titulo}">
        <span>${item.titulo} - $${item.precio.toFixed(2)}</span>
      </div>
      <div>
        <input type="number" min="1" value="${item.cantidad}" data-index="${index}" class="editar-cantidad">
        <button class="eliminar-item" data-index="${index}">🗑️</button>
      </div>
    `;
    lista.appendChild(li);
  });

  total.textContent = totalCompra.toFixed(2);
}

// ==============================
// Editar cantidad
// ==============================
document.addEventListener('input', e => {
  if (e.target.classList.contains('editar-cantidad')) {
    const index = e.target.dataset.index;
    const nuevaCantidad = parseInt(e.target.value);
    carrito[index].cantidad = nuevaCantidad > 0 ? nuevaCantidad : 1;
    guardarYActualizar();
  }
});

// ==============================
// Guardar y actualizar
// ==============================
function guardarYActualizar() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderizarCarrito();
  actualizarContador();
}

// ==============================
// Validar formulario
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