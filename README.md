# 🌸 Frontend - El Sabor de Rosita

Frontend multipágina para el sistema de menús y gestión de "El Sabor de Rosita".
Desarrollado con Vite, HTML, CSS (custom + Bootstrap) y JavaScript moderno.
Preparado para integrarse con backend Express y MySQL.

---

## ✨ Características principales

- Multipágina: carga independiente de formularios y vistas del menú.
- Integración lista con backend **Node.js** vía proxies.
- Assets optimizados y mapeados con manifest para producción.
- Código moderno: **ESmodules**, rutas organizadas, configuración **Vite** profesional.
- Preparado para despliegue en servicios como **Netlify, Vercel, o estáticamente desde cualquier CDN**

---

## 🚀 Tecnologías

- Vite (build ultra rápido, soporte moderno)
- HTML5 + CSS3 + Bootstrap 5
- JavaScript ESModules
- Arquitectura preparada para integración continua (CI/CD)

## 📂 Estructura del proyecto

front/
├── dist/ # (build final, no subir a git)
├── node_modules/ # (no subir a git)
├── public/ # Imágenes públicas y favicon
├── src/ # Código fuente JS/CSS (modular)
│ ├── auth/ # Módulos de autenticación (login, registro)
│ ├── models/ # Lógica de datos local (si aplica)
│ ├── styles/ # CSS principal y variables
│ └── main.js # Entrada principal JS
├── index.html
├── ingresar.html
├── ingresarUsuario.html
├── menuInicio.html
├── 404.html
├── package.json
├── vite.config.js
├── .gitignore

---

## ⚙️ Scripts útiles (package.json)

### `npm run dev`

Lanza el frontend en modo desarrollo (hot reload, proxy activo al backend).

### `npm run build`

Compila y optimiza todo para producción en la carpeta /dist.

### `npm start`

Vista previa local de lo compilado con vite preview.

---

## 🔧 Configuración importante (vite.config.js)

- Proxy: Redirige llamadas /menu, /uploads, /ingresar, etc., hacia tu backend en desarrollo.

- Multi-entrada: Genera bundles independientes para cada HTML (ej. ingresar, menuInicio).

- Manifest: Genera automáticamente el manifest para servir assets desde el backend.

---

## 🚦 Ejecución local

1. **Instala dependencias**

   npm install

2. **Ejecuta en modo desarrollo** npm run dev

3. **Accede a** http://localhost:5173

4. **Las llamadas API se redirigen al backend Express (configura el backend en paralelo)**

5. **Compila para producción,el resultado va a /dist (no subas esta carpeta a Git).** npm run build

6. **Vista previa local,Levanta un servidor local para testear el build final.** npm start

---

☁️ Despliegue
Estático:
Sube el contenido de /dist a Netlify, Vercel o cualquier CDN.

Fullstack:
El backend Express puede servir los HTML y assets usando el manifest generado.

Railway/Render:
Si quieres deploy fullstack, solo sirve /dist con tu backend ya en Railway.

---

📝 Notas y buenas prácticas
No subas la carpeta dist/ ni node_modules/ a git.

El backend requiere el manifest generado en /dist/.vite/manifest.json para servir assets en prod.

Personaliza tu favicon y assets en /public.

Mantén los scripts y configuraciones actualizados con Vite.

---

📢 Autor
Este backend fue desarrollado por Johana Toledo.
Contacto: toledanadev@gmail.com

---
