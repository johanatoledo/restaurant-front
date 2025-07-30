// listaBebidas.js

const backendBaseUrl = import.meta.env.VITE_API_URL || 'https://restaurant-back-production.up.railway.app';


export async function renderizarPlatosEnContenedor() {
  const contenedor = document.getElementById('container-platos');
  contenedor.innerHTML = '<div class="text-center p-5">Cargando platos...</div>';

  try {
    const res = await fetch(`${backendBaseUrl}/admin/listaPlatos`);
    if (!res.ok) throw new Error("Error al obtener los platos guardados");
    const platos = await res.json();

    if (!Array.isArray(platos) || platos.length === 0) {
      contenedor.innerHTML = `<div class="alert alert-info text-center mt-4">No hay platos guardados todavía.</div>`;
      return;
    }

 
    const grid = document.createElement("div");
    grid.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center";

    platos.forEach(p => {
      const card = document.createElement("div");
      card.className = "col";
      card.innerHTML = `
        <div class="card shadow-lg rounded-4 animate-bebidaPlato-in h-100" style="background: linear-gradient(120deg,#0d1e15  10%,#0d1e15  100%);">
          <div style="padding:0.8rem 0.8rem 0.5rem 0.8rem;">
            <img src="${p.imagen ? backendBaseUrl + '/uploads/' + p.imagen : 'https://placehold.co/210x140/orange/white?text=Bebida'}"
                 alt="${p.nombre}"
                 class="img-bebidaPlato-animada"
                 style="width:100%;height:300px;object-fit:cover;">
          </div>
          <div class="card-body text-center pb-2 pt-1" style="padding:0 0.8rem;">
            <h6 class="card-title mb-1" style="font-weight:600;font-size:1.13em;color:#a78646">${p.nombre}</h6>
            <span class="badge bg-warning  text-dark">${p.categoria}</span>
            <div style="font-size:0.94em;color:#FFFFFF;text-align: justify;">${p.descripcion}</div>
            <div class="mb-1" style="color:#FFFFFF;text-align: justify;"><b>Ingredientes:</b> <span style="color:#FFFFFF">${Array.isArray(p.ingredientes) ? p.ingredientes.join(', ') : p.ingredientes}</span></div>
            <span class="badge bg-warning text-dark">S/. ${p.precio}</span>
          </div>
          <button type="button" class="btn btn-sm eliminar-bebidaPlato" style="
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
  
            card.querySelector('.eliminar-bebidaPlato').onclick = async (e) => {
              e.preventDefault();
              if (!confirm(`¿Eliminar plato "${p.nombre}"?`)) return;
              try {
                const res = await fetch(`${backendBaseUrl}/admin/platos/${p.id}`, {
                  method: "DELETE"
                });
                if (!res.ok) throw new Error("No se pudo eliminar el plato");
                
                await renderizarPlatosEnContenedor();
              } catch (err) {
                alert("Error al eliminar el plato");
                console.error(err);
              }
            };
      
      grid.appendChild(card);
    });

    contenedor.innerHTML = ""; 
    contenedor.appendChild(grid);

  } catch (error) {
    contenedor.innerHTML = `<div class="alert alert-danger text-center mt-4">No se pudo mostrar los platos guardados.</div>`;
    console.error(error);
  }
}

