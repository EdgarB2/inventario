const form = document.getElementById("formInventario");
const tablaBody = document.getElementById("tablaBody");

// Cargar datos guardados al iniciar
window.addEventListener("DOMContentLoaded", () => {
  const inventarioGuardado = JSON.parse(localStorage.getItem("inventario")) || [];
  inventarioGuardado.forEach(producto => agregarFila(producto));
});

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const producto = {
    nombre: document.getElementById("nombre").value,
    categoria: document.getElementById("categoria").value,
    cantidad: document.getElementById("cantidad").value,
    fecha: document.getElementById("fecha").value
  };

  agregarFila(producto);
  guardarProducto(producto);
  form.reset();
});

function agregarFila({ nombre, categoria, cantidad, fecha }) {
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${categoria}</td>
    <td>${cantidad}</td>
    <td>${fecha}</td>
  `;
  tablaBody.appendChild(fila);
}

function guardarProducto(producto) {
  const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
  inventario.push(producto);
  localStorage.setItem("inventario", JSON.stringify(inventario));
}
