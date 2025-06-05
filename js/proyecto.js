function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const projectId = getQueryParam("id");
const project = projects[projectId];

if (project) {
  document.title = project.title;
  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-description-left").textContent = project.descriptionLeft;
document.getElementById("project-description-right").textContent = project.descriptionRight;
document.getElementById("title-naming").textContent = project.namingTitle;
document.getElementById("title-style").textContent = project.styleTitle;
  document.getElementById("project-naming").textContent = project.naming;
  document.getElementById("project-style").textContent = project.style;

  // Etiquetas
  const tagsContainer = document.getElementById("project-tags");
  project.tags.forEach(tag => {
    const span = document.createElement("span");
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  // Imágenes
function renderImages(imageList, containerId, altText) {
  const container = document.getElementById(containerId);
  imageList.forEach((src) => {
    const img = document.createElement("img");
    img.src = `img/${src}`;
    img.alt = altText;
    container.appendChild(img);
  });
}

// Llamadas
renderImages(project.imagesTop, "project-images-top", project.title);
renderImages(project.imagesBottom, "project-images-bottom", project.title);
};



/* BOTON SIGUIENTE */

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentId = urlParams.get("id");

  const btnSiguiente = document.getElementById("siguienteProyecto");

  btnSiguiente.addEventListener("click", () => {
    // Buscar la posición del proyecto actual en el array
    const index = projects.findIndex(proy => proy.id === currentId);

    // Calcular el índice del siguiente (cíclico)
    const siguienteIndex = (index + 1) % projects.length;
    const siguienteId = proyects[siguienteIndex].id;

    // Redirigir
    window.location.href = `proyecto.html?id=${siguienteId}`;
  });
});
