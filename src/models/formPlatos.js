
import { Plate } from './plate.js';

const VITE_API_URL = import.meta.env.VITE_API_URL;
const API=`${VITE_API_URL}/api`
let formPlato= null;
let listaIngredientes = []; 



export async function crearFormularioPlato(formTarjetas, contenedorTarjetas) {
  formTarjetas.style.display = "none";

  

  formPlato = document.createElement("form");
  formPlato.id = "form-plate";
  formPlato.style.backgroundColor= "var(--rosita-verde)";
  formPlato.style.padding = "2rem";
  formPlato.style.width="70%";
  formPlato.style.marginLeft = "1rem";
  formPlato.style.marginBottom = "1rem";
  formPlato.style.marginRight = "1rem";
  formPlato.className = " p-4 rounded shadow mt-4 mx-auto";
  formPlato.enctype = "multipart/form-data";
 

  formPlato.innerHTML = `
   <div class="container-fluid px-2 px-sm-4">
  <h2 class="letter-gold">Agregar Plato</h2>
  <div class="mb-3">
    <label for="nombrePlato" class="form-label letter-gold">Nombre</label>
    <input type="text" id="nombrePlato" class="form-control" required>
  </div>
  <div class="mb-3">
    <label for="descripcionPlato" class="form-label letter-gold">Descripción</label>
    <textarea id="descripcionPlato" class="form-control" required></textarea>
  </div>
  <div class="mb-3">
    <label for="precioPlato" class="form-label letter-gold">Precio</label>
    <input type="number" id="precioPlato" class="form-control" step="0.01" required>
  </div>
  <div class="mb-3">
    <label for="categoriaPlato" class="form-label letter-gold">Categoría</label>
    <select id="categoriaPlato" class="form-select" required>
      <option value="">Selecciona una categoría</option>
      <option value="Venezolano">Venezolano</option>
      <option value="Peruano">Peruano</option>
      <option value="Entrada Venezolana">Entrada Venezolana</option>
      <option value="Entrada Peruana">Entrada Peruana</option>
    </select>
  </div>
  <div class="mb-3">
    <label for="ingredientesSelect" class="form-label letter-gold">Selecciona uno o más ingredientes (Ctrl o Shift)</label>
    <select id="ingredientesSelect" class="form-select" multiple required style="height: 150px;">
      <!-- opciones se insertan dinámicamente -->
    </select>
  </div>
  <div class="mb-3">
    <label class="form-label letter-gold">Ingredientes seleccionados:</label>
    <ul id="ingredientesSeleccionados" class="list-group"></ul>
  </div>
  <div class="mb-3">
    <label for="imagenPlato" class="form-label letter-gold">Imagen del plato</label>
    <input type="file" id="imagenPlato" class="form-control" accept="image/*">
  <div id="previewImagen"></div>
   </div>
 <div class="d-flex flex-column flex-sm-row gap-2 mt-3">
      <button id="btn-guardar" type="submit" class="btn btn-primary w-100 w-sm-auto">Guardar</button>
      <button id="btn-mostrar" type="button" class="btn btn-secondary w-100 w-sm-auto">Mostrar</button>
      <button id="btn-salir" type="button" class="btn btn-secondary w-100 w-sm-auto">Salir</button>
    </div>
  </div>
`;
  contenedorTarjetas.appendChild(formPlato);
  document.body.insertBefore(formPlato, document.querySelector("footer"));
  

  const inputImagen = formPlato.querySelector("#imagenPlato");
  const divPreview = formPlato.querySelector("#previewImagen");
  inputImagen.value = ""; 

  inputImagen.addEventListener("change", e => {
    divPreview.innerHTML = ""; 
    const file = e.target.files[0];
    if (file) {
      const preview = document.createElement("img");
      preview.src = URL.createObjectURL(file);
      preview.style.maxWidth = "200px";
      preview.style.display = "block";
      divPreview.appendChild(preview);
    }
  });

  formPlato.addEventListener("submit", enviarPlato);
  formPlato.querySelector("#btn-mostrar").addEventListener("click", () => window.location.href = '/api/admin/platos ');
  formPlato.querySelector("#btn-salir").addEventListener("click", () => cancelarFormulario(formTarjetas));


  await cargarIngredientesSelect();
  const selectIngredientes = document.getElementById("ingredientesSelect");
const listaVisual = document.getElementById("ingredientesSeleccionados");

selectIngredientes.addEventListener("change", () => {
 
  const options = Array.from(selectIngredientes.selectedOptions);
  const nuevo = options.length > 0 ? JSON.parse(options[options.length - 1].value).nombre : null;

  if (nuevo && !listaIngredientes.includes(nuevo)) {
    listaIngredientes.push(nuevo);


    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = nuevo;

   
    const btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    btnEliminar.className = "btn btn-sm btn-outline-danger ms-2";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => {
 
      listaIngredientes = listaIngredientes.filter(ing => ing !== nuevo);
      Array.from(selectIngredientes.options).forEach(opt => {
        const ing = JSON.parse(opt.value);
        if (ing.nombre === nuevo) opt.selected = false;
      });
      li.remove();
    };

    li.appendChild(btnEliminar);
    listaVisual.appendChild(li);
  }
});
}

function cancelarFormulario(formTarjetas) {
  if (formPlato) {
    formPlato.remove();
    formPlato = null;
  }
  if (formTarjetas) {
    formTarjetas.style.display = "block";
    document.getElementById('container-cards').appendChild(formTarjetas);
  }
}

async function cargarIngredientesSelect() {
  const select = document.getElementById("ingredientesSelect");
  if (!select) return;

  try {
    const res = await fetch(`${API}/admin/listaIngredientes`);
    const ingredientes = await res.json();
    ingredientes.forEach(ing => {
      const option = document.createElement("option");
      option.value = JSON.stringify(ing);
      option.textContent = ing.nombre;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error al cargar ingredientes:", error);
  }
}


async function enviarPlato(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombrePlato").value.trim();
  const descripcion = document.getElementById("descripcionPlato").value.trim();
  const precio = parseFloat(document.getElementById("precioPlato").value);
  const categoria = document.getElementById("categoriaPlato").value;
  let ingredientes=listaIngredientes;
  const imagen = document.getElementById("imagenPlato").files[0];

  const nuevoPlato = new Plate(nombre, descripcion, precio, categoria, ingredientes, imagen?.name);

  const plainPlato = {
  ...nuevoPlato,
 ingredientes:nuevoPlato.ingredientes
};

  const formData = new FormData();
  formData.append("plato", JSON.stringify(plainPlato));
  if (imagen) formData.append("imagen", imagen);

  try {
    const res = await fetch(`${API}/admin/platos`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      const text = await res.text(); 
      console.error("Respuesta del servidor no OK:", text);
      alert("Error del servidor:\n" + text);
      return;
    }

  
const prevToast = document.getElementById('toast-exito');
if (prevToast) prevToast.remove();


const toast = document.createElement("div");
toast.id = "toast-exito";
toast.style.position = "fixed";
toast.style.top = "48px";
toast.style.right = "48px";
toast.style.zIndex = "9999";
toast.style.background = "#fff";
toast.style.border = "2px solid #51e199";
toast.style.boxShadow = "0 6px 24px rgba(60,60,60,0.18)";
toast.style.color = "#222";
toast.style.padding = "1.2rem 2.2rem 1.2rem 1.6rem";
toast.style.fontSize = "1.1rem";
toast.style.borderRadius = "1.1rem";
toast.style.display = "flex";
toast.style.alignItems = "center";
toast.style.gap = "1.2rem";
toast.style.minWidth = "320px";
toast.style.maxWidth = "96vw";
toast.style.transition = "opacity .3s";
toast.innerHTML = `
<div style="width:100%;text-align:center;margin-bottom:0.8rem;">
    <img src="assets/comidaVnezolanaInicio.png" alt="Logo" style="width:70px;max-width:120px;">
  </div>
  <span style="font-weight:600;"> Plato guardado exitosamente</span>
  <button id="toast-close" style="
    margin-left:auto;
    background:none;
    border:none;
    color:#666;
    font-size:1.6rem;
    cursor:pointer;
    font-weight:700;
    padding:0 0.8rem;
    transition: color 0.2s;
  " title="Cerrar">×</button>
`;


document.body.appendChild(toast);
document.getElementById("toast-close").onclick = function () {
  window.location.href = `${API}/admin/platos`; 
};


setTimeout(() => {
  if (toast.parentNode) {
    toast.style.opacity = "0";
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
      window.location.href = `${API}/admin/platos`;
    }, 400);
  }
}, 4000);


  } catch (err) {
    console.error("Error en fetch:", err);
    alert("No se pudo guardar el plato.");
  }
}


