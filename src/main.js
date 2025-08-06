import './styles/styles.css';

import { initLoginForm } from './auth/login.js';
import { initRegisterOrRecover } from './auth/register.js';

import { crearFormularioIngredientes } from './models/ingredients.js';
import { crearFormularioPlato } from './models/formPlatos.js';
import { crearFormularioBebida } from './models/formBebida.js';

import { renderizarBebidasEnContenedor } from './models/listaBebidas.js';  
import { renderizarPlatosEnContenedor } from './models/listaPlatos.js';
import { renderizarIngredientesEnContenedor } from './models/listaIngredientes.js';

const VITE_API_URL = import.meta.env.VITE_API_URL;
const API=`${VITE_API_URL}/api`
async function inicializarMenuPlatos() {
  const contenedor = document.getElementById('contenedor-menu-dinamico');
  if (!contenedor) return;

  contenedor.innerHTML = `<div class="text-center p-5">Cargando...</div>`;
  const params = new URLSearchParams(window.location.search);
  let apiURL = '';

  if (params.has('categoria')) {
    apiURL = `${API}/menu/platos?categoria=${encodeURIComponent(params.get('categoria'))}`;
  } else {
    contenedor.innerHTML = `<div class="alert alert-info text-center">No hay categoría/tipo seleccionado.</div>`;
    return;
  }

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
            <img src="/uploads/${item.imagen}" class="img-fluid rounded-4 img-bebidaPlato-animada" alt="${item.nombre}">
            <div class="cards-body text-center">
              <h6 class="fw-bold mb-1 letter-gold">${item.nombre}</h6>
              <span class="badge bg-warning text-dark mb-2">${item.categoria}</span>
              <div class="text-muted mb-2" style="font-size: 0.95em; color: var(--rosita-blanco) !important;">${item.descripcion || ""}</div>
              ${item.precio ? `<span class=" badge bg-warning text-dark mb-2">S/. ${item.precio}</span>` : ""}
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function inicializarMenuBebidas() {
  const contenedorBebidas = document.getElementById("menu-bebidas");
  if (!contenedorBebidas) return;

  contenedorBebidas.innerHTML = `
    <h1 class="text-center mb-4">Disfruta de Nuestra Variedad en Jugos, Cocteles y Tragos!</h1>
    <div class="row justify-content-center g-3" id="bebidas-categorias">
      <div class="col-auto">
        <div class="menu-card" style="width: 200px; cursor:pointer;">
          <a href="?categoria=Cocteles"><img src="/assets/coctelesCard.png" class="img-fluid rounded-4" alt="Cocteles" /></a>
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

  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('categoria')) {
    mostrarBebidasPorCategoria(searchParams.get('categoria'));
  }
}

async function mostrarBebidasPorCategoria(categoria) {
  const resultado = document.getElementById('resultado-bebidas');
  resultado.innerHTML = `<div class="text-center p-5">Cargando...</div>`;
  try {
    const res = await fetch(`/menu/bebidas?categoria=${encodeURIComponent(categoria)}`);
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
    <div class="row justify-content-center g-3 ">
      ${items.map(item => `
        <div class="col-auto">
          <div class="card shadow rounded-4" style="width: 200px;">
            <img src="/uploads/${item.imagen}" class="img-fluid rounded-4 img-bebidaPlato-animada" style="height:200px !important;" alt="${item.nombre}">
            <div class="cards-body text-center">
              <h6 class="fw-bold mb-1 letter-gold">${item.nombre}</h6>
              <span class="badge bg-warning text-dark mb-2">${item.categoria}</span>
              <div class="text-muted mb-2 descripcion-corta" style="font-size: 0.95em;color: var(--rosita-blanco) !important;">${item.descripcion || ""}</div>
              ${item.precio ? `<span class="badge bg-warning text-dark">S/. ${item.precio}</span>` : ""}
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}



window.addEventListener("DOMContentLoaded", () => {
 
  // Inicializa formularios de administración (si existen)
  const btnAgregar = document.getElementById("btn-agregar-ingrediente");
  const btnAgregarPlato = document.getElementById("btn-agregar-plato");
  const btnAgregarBebida = document.getElementById("btn-agregar-bebida");
  const formTarjetas = document.getElementById("form-ingreso-datos");
  const contenedorTarjetas = document.getElementById("container-cards");
  if (btnAgregar) {
    btnAgregar.addEventListener("click", (e) => {
      e.preventDefault();
      formTarjetas.style.display = "none";
      crearFormularioIngredientes(formTarjetas, contenedorTarjetas);
    });
  }
  if (btnAgregarPlato) {
    btnAgregarPlato.addEventListener("click", (e) => {
      e.preventDefault();
      crearFormularioPlato(formTarjetas, contenedorTarjetas);
    });
  }
  if (btnAgregarBebida) {
    btnAgregarBebida.addEventListener("click", (e) => {
      e.preventDefault();
      crearFormularioBebida(formTarjetas, contenedorTarjetas);
    });
  }

  // Renderiza listas si corresponde (admin)
  if (document.getElementById('container-bebidas')) renderizarBebidasEnContenedor();
  if (document.getElementById('container-platos')) renderizarPlatosEnContenedor();
  if (document.getElementById('container-ingredientes')) renderizarIngredientesEnContenedor();

  // Formularios de login y registro
  initLoginForm();
  initRegisterOrRecover();

  //menu platos y bebidas 
  inicializarMenuBebidas();
  inicializarMenuPlatos();

 
/*
 // -- Código para manejar los eventos del menú --

  // Lógica para platos
  document.querySelectorAll('#menu-platos a[data-categoria]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const categoria = this.getAttribute('data-categoria');
      if (categoria) {
        window.history.pushState({}, '', `?categoria=${encodeURIComponent(categoria)}`);
        inicializarMenuPlatos();
      }
    });
  });

  // Lógica para bebidas
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

  // Inicialización basada en la URL (al cargar la página)
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('categoria')) {
    if (document.getElementById('contenedor-menu-dinamico')) {
      inicializarMenuPlatos();
    }
    if (document.getElementById("menu-bebidas")) {
      mostrarBebidasPorCategoria(searchParams.get('categoria'));
    }
  }
 */
  
});
