const form = document.getElementById("formInventario");
const tablaBody = document.getElementById("tablaBody");

let editIndex = null; // Nuevo: para saber si estamos editando

// Cargar datos guardados al iniciar
window.addEventListener("DOMContentLoaded", () => {
  const inventarioGuardado = JSON.parse(localStorage.getItem("inventario")) || [];
  inventarioGuardado.forEach((producto, idx) => agregarFila(producto, idx));
});

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const producto = {
    nombre: document.getElementById("nombre").value,
    categoria: document.getElementById("categoria").value,
    cantidad: document.getElementById("cantidad").value,
    fecha: document.getElementById("fecha").value
  };

  if (editIndex !== null) {
    modificarProducto(producto, editIndex);
    editIndex = null;
    form.querySelector('button[type="submit"]').textContent = "Agregar";
  } else {
    agregarFila(producto);
    guardarProducto(producto);
  }
  form.reset();
});

function agregarFila({ nombre, categoria, cantidad, fecha }, idx) {
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${categoria}</td>
    <td>${cantidad}</td>
    <td>${fecha}</td>
    <td><button type="button" class="editar">Editar</button></td>
  `;
  // Botón editar
  fila.querySelector(".editar").addEventListener("click", () => cargarParaEditar(idx ?? obtenerIndiceFila(fila)));
  tablaBody.appendChild(fila);
}

function guardarProducto(producto) {
  const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
  inventario.push(producto);
  localStorage.setItem("inventario", JSON.stringify(inventario));
}

function cargarParaEditar(idx) {
  const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
  const producto = inventario[idx];
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("categoria").value = producto.categoria;
  document.getElementById("cantidad").value = producto.cantidad;
  document.getElementById("fecha").value = producto.fecha;
  editIndex = idx;
  form.querySelector('button[type="submit"]').textContent = "Modificar";
}

function modificarProducto(producto, idx) {
  const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
  inventario[idx] = producto;
  localStorage.setItem("inventario", JSON.stringify(inventario));
  renderTabla();
}

function renderTabla() {
  tablaBody.innerHTML = "";
  const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
  inventario.forEach((producto, idx) => agregarFila(producto, idx));
}

function obtenerIndiceFila(fila) {
  return Array.from(tablaBody.children).indexOf(fila);
}
