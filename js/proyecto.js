// Función para obtener parámetros de la URL (ej: ?id=plaza)
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Función para mostrar varios párrafos dentro de un contenedor
function renderParagraphs(containerId, text) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (!text) return;

  const paragraphs = text.trim().split(/\n\s*\n/);
  paragraphs.forEach(p => {
    const el = document.createElement("p");
    el.textContent = p.trim();
    container.appendChild(el);
  });
}

// Función para mostrar imágenes o vídeos
function renderImages(imageList, containerId, altText) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (!imageList) return;

  imageList.forEach(item => {
    if (typeof item === "string") {
      const img = document.createElement("img");
      img.src = `img/${item}`;
      img.alt = altText;
      img.loading = "lazy";
      container.appendChild(img);
    } else if (typeof item === "object" && item.type === "video") {
      const video = document.createElement("video");
      video.src = `img/${item.src}`;
      if (item.poster) {
        video.poster = `img/${item.poster}`;
      }
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.controls = false;
      container.appendChild(video);
    }
  });
}

// ========================
// INICIO DE CARGA DINÁMICA
// ========================

const projectId = getQueryParam("id");
const projectList = Object.values(projects);
const project = projectList.find(p => p.id === projectId);

if (project) {
  document.title = project.title;
  document.getElementById("project-title").textContent = project.title;

  document.getElementById("project-year").textContent = project.year || "";
  document.getElementById("project-client").textContent = project.client || "";

  const tagsContainer = document.getElementById("project-tags");
  tagsContainer.innerHTML = "";
  project.tags.forEach(tag => {
    const span = document.createElement("span");
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  renderParagraphs("project-description", project.description);
  renderImages(project.images, "project-images", project.title);
}

// ============================
// ANIMACIÓN Y SIGUIENTE PROYECTO
// ============================

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector(".Project");
  const btnSiguiente = document.getElementById("siguienteProyecto");
  const currentId = getQueryParam("id");
  const footer = document.getElementById("Footer");

  // Animación de entrada
  setTimeout(() => {
    main.classList.add("loaded");
    footer.classList.add("loaded");
    document.body.classList.remove("is-loading");
  }, 100);

  if (btnSiguiente) {
    btnSiguiente.addEventListener("click", () => {
      // Desplaza hacia arriba suavemente antes de cambiar
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Espera antes de cambiar la página
      setTimeout(() => {
        const currentIndex = projectList.findIndex(p => p.id === currentId);
        const siguienteIndex = (currentIndex + 1) % projectList.length;
        const siguienteId = projectList[siguienteIndex].id;

        // Añade clase para animación de salida
        main.classList.remove("loaded");
        document.body.classList.add("is-loading");

        // Redirige después de otro pequeño retardo
        setTimeout(() => {
          window.location.href = `proyecto.html?id=${siguienteId}`;
        }, 300);
      }, 300);
    });
  }
});
