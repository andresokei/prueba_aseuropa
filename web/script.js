let productos = [
    { sku: "001", nombre: "Ratón inalámbrico", precio: 19.99 },
    { sku: "002", nombre: "Teclado mecánico", precio: 49.99 },
    { sku: "003", nombre: "Pantalla 24''", precio: 149.99 },
    { sku: "004", nombre: "Auriculares Bluetooth", precio: 29.99 },
    { sku: "005", nombre: "Cargador USB-C", precio: 15.00 },
    { sku: "006", nombre: "Silla ergonómica", precio: 199.99 },
    { sku: "007", nombre: "Alfombrilla XXL", precio: 12.00 },
    { sku: "008", nombre: "Portátil 14''", precio: 599.99 },
    { sku: "009", nombre: "Cámara Web HD", precio: 39.99 },
    { sku: "010", nombre: "Base refrigerante", precio: 24.90 }
  ];
  
  function manejarProductos(accion, producto = null, filtro = '') {
    if (accion === 'filtrar') {
      return productos.filter(p =>
        p.nombre.toLowerCase().includes(filtro.toLowerCase())
      );
    }
    if (accion === 'agregar' && producto) {
      productos.push(producto);
    }
    if (accion === 'eliminar' && producto) {
      productos = productos.filter(p => p.sku !== producto.sku);
    }
    return productos;
  }
  
  function renderTabla(lista) {
    const tabla = document.getElementById("productTableBody");
    tabla.innerHTML = '';
  
    lista.forEach(p => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${p.sku}</td>
        <td>${p.nombre}</td>
        <td>${p.precio.toFixed(2)}</td>
        <td><button class="btn btn-sm btn-danger eliminar-btn" data-sku="${p.sku}">Eliminar</button></td>
      `;
      tabla.appendChild(fila);
    });
  
    // Botones de eliminar
    document.querySelectorAll(".eliminar-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const sku = btn.getAttribute("data-sku");
        manejarProductos('eliminar', { sku });
        const filtro = document.getElementById("searchInput").value;
        renderTabla(manejarProductos('filtrar', null, filtro));
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const inputBusqueda = document.getElementById("searchInput");
    const formAgregar = document.getElementById("addProductForm");
  
    inputBusqueda.addEventListener("input", () => {
      const filtro = inputBusqueda.value;
      renderTabla(manejarProductos('filtrar', null, filtro));
    });
  
    formAgregar.addEventListener("submit", (e) => {
      e.preventDefault();
      const sku = document.getElementById("inputSKU").value.trim();
      const nombre = document.getElementById("inputNombre").value.trim();
      const precio = parseFloat(document.getElementById("inputPrecio").value);
  
      if (!sku || !nombre || isNaN(precio)) return;
  
      manejarProductos('agregar', { sku, nombre, precio });
      formAgregar.reset();
      renderTabla(manejarProductos('filtrar', null, inputBusqueda.value));
    });
  
    renderTabla(productos);
  });
  