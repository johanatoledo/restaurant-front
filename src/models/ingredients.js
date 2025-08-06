import { FoodItem } from './foodItem.js';
const VITE_API_URL = import.meta.env.VITE_API_URL;
const API=`${VITE_API_URL}/api`
export function crearFormularioIngredientes(formTarjetas, contenedorTarjetas) {
  const formIngredientes = document.createElement("form");
  formIngredientes.id = "form-ingredientes";
  formIngredientes.className = "bg-white p-4 rounded shadow mt-4";
  formIngredientes.style.backgroundColor= "var(--rosita-verde) !important";



  formIngredientes.innerHTML = `
    <h2 class="letter-gold">Ingrediente</h2>
    <div class="mb-3">
      <label for="nombreIngrediente" class="form-label letter-gold">Nombre</label>
      <input type="text" id="nombreIngrediente" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="caloriasIngrediente" class="form-label letter-gold">Calorías</label>
      <input type="number" id="caloriasIngrediente" class="form-control" required>
    </div>
    <div class="mb-3">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="esVegano">
        <label class="form-check-label letter-gold" for="esVegano">Vegano</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="contieneGluten">
        <label class="form-check-label letter-gold" for="contieneGluten">Contiene gluten</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="esCitrico">
        <label class="form-check-label letter-gold" for="esCitrico">Es cítrico</label>
      </div>
    </div>
    <div>

      <button id="btn-guardar" type="button" class="btn btn-primary">Guardar</button>
      <button id="btn-mostrar" type="button" class="btn btn-primary">Mostrar</button>
      <button id="btn-salir" type="button" class="btn btn-secondary">Salir</button>
    </div>
  `;


  contenedorTarjetas.appendChild(formIngredientes);

  formIngredientes.querySelector("#btn-guardar").addEventListener("click", async () => {
    const nombre = document.getElementById("nombreIngrediente").value.trim();
    const calorias = parseInt(document.getElementById("caloriasIngrediente").value);
    const vegano = document.getElementById("esVegano").checked;
    const gluten = document.getElementById("contieneGluten").checked;
    const citrico = document.getElementById("esCitrico").checked;

    if (!nombre || isNaN(calorias)) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }

    const nuevoIngrediente = new FoodItem(nombre, calorias, vegano, gluten, citrico);

    try {
      const res = await fetch(`${API}/admin/ingredientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoIngrediente)
      });

      const data = await res.json();
      if (res.ok) {
        alert("Ingrediente guardado correctamente");
        limpiarCampos();
        
      } else {
        alert("Error del servidor: " + data.message);
      }
    } catch (error) {
      console.error("Error al guardar ingrediente:", error);
      alert("No se pudo guardar el ingrediente.");
    }
  });

  

  

  formIngredientes.querySelector("#btn-salir").addEventListener("click", () => {
    formIngredientes.remove();
    formTarjetas.style.display = "block";
  });
  formIngredientes.querySelector("#btn-mostrar").addEventListener("click", () => {
     window.location.href =  window.location.href = '/api/admin/ingredientes';
  });

  function limpiarCampos() {
    formIngredientes.reset();
  }

 
}
