// Función para obtener parámetros de la URL (ej: ?id=plaza)
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param); // Devuelve el valor de ese parámetro
}

// Función para mostrar varios párrafos dentro de un contenedor
function renderParagraphs(containerId, text) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Limpia el contenido existente

  if (!text) return;

  // Divide el texto en párrafos usando doble salto de línea
  const paragraphs = text.trim().split(/\n\s*\n/);

  // Crea e inserta un <p> por cada párrafo
  paragraphs.forEach(p => {
    const el = document.createElement("p");
    el.textContent = p.trim();
    container.appendChild(el);
  });
}

// Función para mostrar imágenes dentro de un contenedor

function renderImages(imageList, containerId, altText) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (!imageList) return;

  imageList.forEach(item => {
    // Si es una string, asumimos que es imagen
    if (typeof item === "string") {
      const img = document.createElement("img");
      img.src = `img/${item}`;
      img.alt = altText;
      container.appendChild(img);
    }
    // Si es un objeto y tiene tipo 'video'
    else if (typeof item === "object" && item.type === "video") {
      const video = document.createElement("video");
      video.src = `img/${item.src}`;
      video.poster = item.poster ? `img/${item.poster}` : "";
      video.controls = false;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      container.appendChild(video);
    }
  });
}

// --- INICIO DEL CARGADO DE DATOS DINÁMICOS ---

// Obtiene el ID del proyecto desde la URL (ej: plaza)
const projectId = getQueryParam("id");

// Convierte el objeto de proyectos en un array para poder buscar
const projectList = Object.values(projects);

// Busca el proyecto que coincide con el ID
const project = projectList.find(p => p.id === projectId);

// Si el proyecto existe, lo mostramos
if (project) {
  // Cambia el título de la página
  document.title = project.title;

  // Muestra el título principal
  document.getElementById("project-title").textContent = project.title;

  // Muestra el año y cliente si existen
  document.getElementById("project-year").textContent = project.year || "";
  document.getElementById("project-client").textContent = project.client || "";

  // Muestra las etiquetas (tags)
  const tagsContainer = document.getElementById("project-tags");
  tagsContainer.innerHTML = ""; // Limpia etiquetas anteriores

  project.tags.forEach(tag => {
    const span = document.createElement("span");
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  // Muestra los párrafos de descripción
  renderParagraphs("project-description", project.description);

  // Muestra las imágenes del proyecto
  renderImages(project.images, "project-images", project.title);
}



// ========================
// Botón "Siguiente Proyecto"
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const currentId = getQueryParam("id");
  const btnSiguiente = document.getElementById("siguienteProyecto");

  if (btnSiguiente) {
    btnSiguiente.addEventListener("click", () => {
      const currentIndex = projectList.findIndex(p => p.id === currentId);
      const siguienteIndex = (currentIndex + 1) % projectList.length;
      const siguienteId = projectList[siguienteIndex].id;

      // Redirigir al siguiente proyecto
      window.location.href = `proyecto.html?id=${siguienteId}`;
    });
  }
});
