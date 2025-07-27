// auth/register.js

export async function initRegisterOrRecover() {
  const params = new URLSearchParams(window.location.search);
  const opcion = params.get('opcion');
  const contenedor = document.getElementById('contenedor-formularios');

  if (!contenedor || !opcion) return;

  let endpoint = '';
  let postEndpoint = '';
  if (opcion === 'registro') {
    endpoint = '/ingresar/register';
    postEndpoint = '/ingresar/register';
  } else if (opcion === 'recuperar') {
    endpoint = '/ingresar/recuperar';
    postEndpoint = '/ingresar/recuperar';
  }

  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error('Formulario no encontrado');
    const html = await res.text();
    contenedor.innerHTML = html;

    // --- Registro ---
    if (opcion === 'registro') {
      const form = document.getElementById('form-registro');
      form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('registerName')?.value.trim();
        const email = document.getElementById('registerEmail')?.value.trim();
        const password = document.getElementById('registerPassword')?.value.trim();

        const response = await fetch(postEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, email, password })
        });

        const data = await response.json();
        alert(data.message || 'Registro procesado');
        window.location.href = '/ingresarUsuario';
      });
    }

    // --- Recuperar contraseña ---
    if (opcion === 'recuperar') {
      const form = document.getElementById('form-recuperar');
      form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('recoverEmail')?.value.trim();

        const response = await fetch(postEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
          const { token } = data;
          alert('Recuperación procesada. Serás redirigido al formulario de nueva contraseña.');
          setTimeout(() => {
            window.location.href = `/ingresar/reset-password?token=${token}`;
          }, 2000);
        } else {
          alert(data.message || 'No se pudo recuperar la cuenta');
        }
      });
    }
  } catch (err) {
    console.error('Error cargando formulario:', err);
    contenedor.innerHTML = `<p class="text-danger">Error al cargar el formulario</p>`;
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('usuarioLogueado');
      window.location.href = '/ingresarUsuario';
    });
  }
}
