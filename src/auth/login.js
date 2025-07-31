// auth/login.js
const API = import.meta.env.VITE_API_URL; 
export function initLoginForm() {
  const form = document.getElementById('form-login-inicio');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    try {
      const res = await fetch(`${API}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      let data = {};
      try {
        data = await res.json();
      } catch (error) {
        console.error("No se pudo parsear JSON:", error);
      }

      if (res.ok) {
        localStorage.setItem("usuarioLogueado", JSON.stringify(data.user));
        alert('Bienvenido ' + (data.user?.nombre || 'usuario'));
        setTimeout(() => {
          window.location.href = `${API}/admin/editarMenu`;
        }, 200);
      } else {
        alert(data.message || "Credenciales incorrectas");
        setTimeout(() => {
          window.location.href = "/";
        }, 200);
      }
    } catch (error) {
      console.error("Error en la solicitud de login:", error);
      alert("Error en el servidor. Intente más tarde.");
    }
  });
}
