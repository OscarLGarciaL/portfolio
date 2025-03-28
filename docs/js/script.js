// CHANGE LANGUAGE
async function cargarIdioma(idioma) {
    try {
        // Construir la ruta absoluta asegurando que siempre busque en /lang/
        const rutaJSON = `${window.location.origin}/portfolio/docs/lang/${idioma}.json`;

        // Cargar el archivo JSON del idioma seleccionado
        const respuesta = await fetch(rutaJSON);
        const textos = await respuesta.json();

        // Buscar todos los elementos con un ID y actualizar su texto
        document.querySelectorAll("[id]").forEach(elemento => {
            const id = elemento.id;
            if (textos[id]) {
                elemento.innerHTML = textos[id];
            }
        });

        // Guardar la preferencia de idioma
        localStorage.setItem("idioma", idioma);
    } catch (error) {
        console.error("Error cargando el idioma:", error);
    }
}

// Función para alternar entre inglés y español
function cambiarIdioma() {
    const idiomaActual = localStorage.getItem("idioma") === "es" ? "en" : "es";
    cargarIdioma(idiomaActual);
}

// Detectar el idioma guardado y aplicarlo al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const idiomaGuardado = localStorage.getItem("idioma") || "en";
    cargarIdioma(idiomaGuardado);

    // Agregar evento al botón para cambiar el idioma
    document.getElementById("lang-button").addEventListener("click", cambiarIdioma);
});




// REVEAL
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".unrevealed");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.replace("unrevealed", "revealed");
                    observer.unobserve(entry.target); // Stops observing once it's visible
                }
            });
        },
        { threshold: 0.01 } // trigger when % visible
    );

    elements.forEach(element => {
        observer.observe(element);
    });
});

// SHRINK NAVBAR
window.addEventListener("scroll", function () {
    let navbar = document.getElementById("navbar");

    if (window.scrollY > 40) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

// HAMBURGER MENU
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        menuToggle.classList.toggle("open");
    });
});

// GOOGLY EYES
document.addEventListener("mousemove", (event) => {
    const eyes = document.querySelectorAll(".eye");

    eyes.forEach((eye) => {
        const pupil = eye.querySelector(".pupil");
        const eyeRect = eye.getBoundingClientRect();

        // calculates the position of the cursor with respect to the eye
        const eyeX = eyeRect.left + eyeRect.width / 2;
        const eyeY = eyeRect.top + eyeRect.height / 2;
        const deltaX = event.clientX - eyeX;
        const deltaY = event.clientY - eyeY;

        // angle towards the cursor
        const angle = Math.atan2(deltaY, deltaX);

        // maximum distance that the pupil can move within the eye
        const maxMove = 5;
        const moveX = Math.cos(angle) * maxMove;
        const moveY = Math.sin(angle) * maxMove;

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// FILTER MENU
document.addEventListener("DOMContentLoaded", () => {
    const filterToggle = document.getElementById("filterToggle");
    const filterMenu = document.getElementById("filterMenu");

    filterToggle.addEventListener("click", () => {
        filterMenu.classList.toggle("filterMenu--slide"); // Slide menu up/down
        filterToggle.classList.toggle("filterToggle--active"); // Change button color
    });
});

// FILTER BUTTONS
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-container__menu__button"); // buttons
    const cards = document.querySelectorAll(".portfolio-grid__card"); // cards

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter"); // get filter

            cards.forEach(card => {
                const keywords = card.getAttribute("data-keywords"); // get cards

                // show all cards if filter is "all"
                if (filter === "all" || keywords.includes(filter)) {
                    card.classList.remove("card--hidden"); // show
                } else {
                    card.classList.add("card--hidden"); // hide
                }
            });
        });
    });
});

// GALLERY
document.addEventListener("DOMContentLoaded", () => {
    const galleryImages = document.querySelectorAll(".project__gallery__image");
    const fullscreen = document.querySelector(".project__fullscreen");
    const fullscreenImage = document.querySelector(".project__fullscreen__image");
    const closeButton = document.querySelector(".project__fullscreen__close");
    const prevButton = document.querySelector(".project__fullscreen__prev");
    const nextButton = document.querySelector(".project__fullscreen__next");

    let currentIndex = 0;

    function showImage(index) {
        if (index < 0) index = galleryImages.length - 1;
        if (index >= galleryImages.length) index = 0;
        currentIndex = index;

        fullscreenImage.src = galleryImages[currentIndex].src;
        fullscreen.classList.add("fullscreen--active");
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            showImage(index);
        });
    });

    function closeFullscreen() {
        fullscreen.classList.remove("fullscreen--active");
    }

    closeButton.addEventListener("click", closeFullscreen);

    prevButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent closing when clicking prev button
        showImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent closing when clicking next button
        showImage(currentIndex + 1);
    });

    fullscreen.addEventListener("click", closeFullscreen);
    fullscreenImage.addEventListener("click", closeFullscreen);

    document.addEventListener("keydown", (event) => {
        if (!fullscreen.classList.contains("fullscreen--active")) return;
        if (event.key === "ArrowLeft") showImage(currentIndex - 1);
        if (event.key === "ArrowRight") showImage(currentIndex + 1);
        if (event.key === "Escape") closeFullscreen();
    });
});