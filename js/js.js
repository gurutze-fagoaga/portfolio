/*--------------------------------------------------------------------------------*\
* js.js
*    Estructura:
*       -Constantes
*       -Variables
*       -Funciones
*---------------------------------------------------------------------------------*/


// ------------------------- CONSTANTES Y VARIABLES ------------------------------- //

// Selección del botón de subir
const btnSubir = document.querySelector("#Main-subir");
// Selección de los iconos del menu hamburguesa (boton para abrir y cerrar menu)
const listaIconosMenu = document.querySelectorAll(".Header-icon");
// Selección del menu
const menu = document.querySelector(".Menu");
// Selección de los items de la lista del menu
const listaBotonesMenu = document.querySelectorAll(".Menu-item");


// ------------------------- FUNCIONES ------------------------------- //

// Mostrar botón de subir al hacer scroll
document.addEventListener('scroll', (e) => {
  if (window.scrollY != 0){
    btnSubir.classList.remove("u-displayNone");
  } else {
    btnSubir.classList.add("u-displayNone");
  }
});

// Scroll arriba al hacer click en el botón
btnSubir.addEventListener("click", () => {
  window.scrollTo(0, 0);
  btnSubir.classList.add("u-displayNone");
});

// Función para desplegar y plegar el menu hamburguesa
listaIconosMenu.forEach(icono => {
  icono.addEventListener("click", () => {
    menu.classList.toggle("desplegado");

    // Cambia visibilidad de los iconos de abrir/cerrar
    listaIconosMenu.forEach(icono => {
      icono.classList.toggle("u-displayNone");
      icono.classList.toggle("desplegado");
    });
  });
});

// Animación al cargar página
window.onload = () => {
  document.body.classList.add("loaded");
};


// ------------------------- FILTRO DE PROYECTOS ------------------------------- //

document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.Filter-button');
  const projects = document.querySelectorAll('.Project');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter.toLowerCase();

      projects.forEach(project => {
        const tags = project.querySelectorAll('.Project-tag');
        const tagTexts = Array.from(tags).map(tag => tag.textContent.toLowerCase());

        if (filter === 'all') {
          project.style.display = '';
        } else {
          const matchesFilter = tagTexts.some(tag => tag.includes(filter));
          project.style.display = matchesFilter ? '' : 'none';
        }
      });

      // Opcional: marcar botón activo
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
});









