const API = import.meta.env.VITE_API_URL; 

document.addEventListener('DOMContentLoaded', () => {
  // ----- PLATOS Y ENTRADAS -----
  const contenedorMenu = document.getElementById('contenedor-menu-dinamico');
  if (contenedorMenu) {
    cargarMenuPorCategoria(contenedorMenu);
  }

  // ----- BEBIDAS -----
  const contenedorBebidas = document.getElementById("menu-bebidas");
  if (contenedorBebidas) {
    renderizarCategoriasBebidas(contenedorBebidas);
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('categoria')) {
      mostrarBebidasPorCategoria(searchParams.get('categoria'));
    }
  }
});

async function cargarMenuPorCategoria(contenedor) {
  contenedor.innerHTML = `<div class="text-center p-5">Cargando...</div>`;
  const params = new URLSearchParams(window.location.search);
  if (!params.has('categoria')) {
    contenedor.innerHTML = `<div class="alert alert-info text-center">No hay categoría/tipo seleccionado.</div>`;
    return;
  }
  const apiURL = `${API}/menu/platos?categoria=${encodeURIComponent(params.get('categoria'))}`;
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    renderizarTarjetas(contenedor, data);
  } catch (error) {
    contenedor.innerHTML = `<div class="alert alert-danger text-center">Error al cargar la categoría.</div>`;
  }
}

function renderizarTarjetas(contenedor, items) {
  if (!items || items.length === 0) {
    contenedor.innerHTML = `<div class="alert alert-info text-center">No hay resultados para esta categoría.</div>`;
    return;
  }
  contenedor.innerHTML = `
    <div class="row justify-content-center g-3">
      ${items.map(item => `
        <div class="col-auto">
          <div class="card shadow rounded-4" style="width: 200px;">
            <img src="${API}/uploads/${item.imagen}" class="img-fluid rounded-4 img-bebidaPlato-animada" alt="${item.nombre}">
            <div class="card-body text-center">
              <h6 class="fw-bold mb-1 letter-gold">${item.nombre}</h6>
              <span class="badge bg-warning text-dark mb-2">${item.categoria}</span>
              <div class="text-muted mb-2" style="font-size: 0.95em;">${item.descripcion || ""}</div>
              ${item.precio ? `<span class="badge bg-warning text-dark mb-2">S/. ${item.precio}</span>` : ""}
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// ---------- BEBIDAS -------------
function renderizarCategoriasBebidas(contenedorBebidas) {
  contenedorBebidas.innerHTML = `
    <h1 class="text-center mb-4">¡Disfruta de nuestra variedad en jugos, cócteles y tragos!</h1>
    <div class="row justify-content-center g-3" id="bebidas-categorias">
      <div class="col-auto">
        <div class="menu-card" style="width: 200px; cursor:pointer;">
          <a href="?categoria=Cocteles"><img src="/assets/coctelesCard.png" class="img-fluid rounded-4" alt="Cócteles" /></a>
        </div>
      </div>
      <div class="col-auto">
        <div class="menu-card" style="width: 200px; cursor:pointer;">
          <a href="?categoria=Jugos%20Naturales"><img src="/assets/JugosCard.png" class="img-fluid rounded-4" alt="Jugos Naturales" /></a>
        </div>
      </div>
      <div class="col-auto">
        <div class="menu-card" style="width: 200px; cursor:pointer;">
          <a href="?categoria=Tragos"><img src="/assets/tragoscard.png" class="img-fluid rounded-4" alt="Tragos" /></a>
        </div>
      </div>
    </div>
    <div id="resultado-bebidas"></div>
  `;

  document.querySelectorAll('#bebidas-categorias a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const params = new URLSearchParams(this.search);
      const categoria = params.get('categoria');
      if (categoria) {
        mostrarBebidasPorCategoria(categoria);
        window.history.pushState({}, '', `?categoria=${encodeURIComponent(categoria)}`);
      }
    });
  });
}

async function mostrarBebidasPorCategoria(categoria) {
  const resultado = document.getElementById('resultado-bebidas');
  resultado.innerHTML = `<div class="text-center p-5">Cargando...</div>`;
  try {
    const res = await fetch(`${API}/menu/bebidas?categoria=${encodeURIComponent(categoria)}`);
    const data = await res.json();
    renderizarTarjetasBebidas(resultado, data);
  } catch (error) {
    resultado.innerHTML = `<div class="alert alert-danger text-center">Error al cargar la categoría.</div>`;
  }
}

function renderizarTarjetasBebidas(contenedor, items) {
  if (!items || items.length === 0) {
    contenedor.innerHTML = `<div class="alert alert-info text-center">No hay resultados para esta categoría.</div>`;
    return;
  }
  contenedor.innerHTML = `
    <div class="row justify-content-center g-3">
      ${items.map(item => `
        <div class="col-auto">
          <div class="card shadow rounded-4" style="width: 200px;">
            <img src="${API}/uploads/${item.imagen}" class="img-fluid rounded-4 img-bebidaPlato-animada" style="height:200px !important;" alt="${item.nombre}">
            <div class="card-body text-center">
              <h6 class="fw-bold mb-1 letter-gold">${item.nombre}</h6>
              <span class="badge bg-warning text-dark mb-2">${item.categoria}</span>
              <div class="text-muted mb-2 descripcion-corta" style="font-size: 0.95em;">${item.descripcion || ""}</div>
              ${item.precio ? `<span class="badge bg-warning text-dark">S/. ${item.precio}</span>` : ""}
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}
