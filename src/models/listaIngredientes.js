const VITE_API_URL = import.meta.env.VITE_API_URL;
const API=`${VITE_API_URL}/api`

export async function renderizarIngredientesEnContenedor() {
  const contenedor = document.getElementById('container-ingredientes');
  contenedor.innerHTML = '<div class="text-center p-5">Cargando ingredientes...</div>';

  try {
    const res = await fetch(`${API}/admin/listaIngredientes`);
    if (!res.ok) throw new Error("Error al obtener ingredientes");
    const ingredientes = await res.json();

    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
      contenedor.innerHTML = `<div class="alert alert-info text-center mt-4">No hay ingredientes guardados todavía.</div>`;
      return;
    }

    const searchDiv = document.createElement("div");
    searchDiv.style = "display:flex;justify-content:center;padding:0.5em 0 1em 0;";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Buscar ingrediente...";
    input.className = "form-control";
    input.style = "max-width:350px;box-shadow:0 1px 5px rgba(0,0,0,0.07);border-radius:16px;font-size:1.1em;";
    searchDiv.appendChild(input);

 
    const grid = document.createElement("div");
    grid.style.display = "flex";
    grid.style.flexDirection = "column";
    grid.style.gap = "2rem";
    grid.style.maxWidth = "600px";
    grid.style.margin = "0 auto";
    grid.style.width = "95%";
    grid.style.padding = "1rem 0";

   
    function renderCards(filtrados) {
      grid.innerHTML = "";
      if (filtrados.length === 0) {
        grid.innerHTML = `<div class="alert alert-warning text-center">No hay ingredientes con ese nombre.</div>`;
        return;
      }
      filtrados.forEach(ing => {
        const card = document.createElement("div");
        card.className = "card shadow-lg rounded-4 animate-bebida-in";
        card.style = `
          background: linear-gradient(120deg,#0d1e15 90%,#263424 100%);
          border: 1.5px solid #a78646;
          min-height:140px;
          margin-bottom:0;
          display:flex;
          align-items:center;
          overflow:hidden;
          position:relative;
        `;
        function badgeSiNo(prop, label) {
          const esSi = prop === "Si";
          return `<span class="badge rounded-pill ms-2" style="
            background:${esSi ? '#28a745' : '#e53935'};
            color:#fff;
            font-size:1em;
            font-weight:500;
            min-width:85px;
            text-align:center;
          ">${label}: ${esSi ? "Sí" : "No"}</span>`;
        }

        card.innerHTML = `
          <div class="card-body text-start py-2 px-4" style="flex:1;">
            <h6 class="mb-2" style="font-weight:700;font-size:1.25em;color:#ffe082;text-shadow:0 1px 0 #4d3c13;">${ing.nombre}</h6>
            <div class="mb-2">
              <span class="badge rounded-pill bg-dark text-warning" style="font-size:1em;">${ing.calorias} cal</span>
            </div>
            <div style="margin:0.3em 0 0.1em 0;display:flex;gap:0.7em;flex-wrap:wrap;">
              ${badgeSiNo(ing.es_vegano, "Vegano")}
              ${badgeSiNo(ing.contiene_gluten, "Contiene gluten")}
              ${badgeSiNo(ing.es_citrico, "Cítrico")}
            </div>
            <button class="btn btn-sm eliminar-ingrediente" style="
             position:absolute;top:14px;right:20px;
              border:2px solid #a78646;
               color:#a78646;
               background:#fff;
              font-weight:600;
               transition:all 0.2s;">
              <i class="fa fa-trash"></i> Eliminar
            </button>
          </div>
        `;

        card.querySelector('.eliminar-ingrediente').onclick = async () => {
          if (!confirm(`¿Eliminar ingrediente "${ing.nombre}"?`)) return;
          try {
            const res = await fetch(`${API}/admin/ingredientes/${ing.id}`, {
              method: "DELETE"
            });
            if (!res.ok) throw new Error("No se pudo eliminar el ingrediente");
            await renderizarIngredientesEnContenedor();
          } catch (err) {
            alert("Error al eliminar ingrediente.");
            console.error(err);
          }
        };

        grid.appendChild(card);
      });
    }

  
    input.addEventListener('input', e => {
      const valor = input.value.toLowerCase();
      const filtrados = ingredientes.filter(ing => ing.nombre.toLowerCase().includes(valor));
      renderCards(filtrados);
    });

   
    renderCards(ingredientes);

    contenedor.innerHTML = ""; 
    contenedor.appendChild(searchDiv);
    contenedor.appendChild(grid);

  } catch (error) {
    contenedor.innerHTML = `<div class="alert alert-danger text-center mt-4">No se pudo mostrar los ingredientes guardados.</div>`;
    console.error(error);
  }
}


