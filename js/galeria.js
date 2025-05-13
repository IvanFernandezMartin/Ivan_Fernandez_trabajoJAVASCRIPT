document.addEventListener("DOMContentLoaded", function () {
    const imagenes = [
        "../images/foto1.png",
        "../images/foto2.png",
        "../images/foto3.png",
        "../images/foto4.png"
    ];

    const galeria = document.getElementById("galeria");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    imagenes.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Imagen de galería";
        img.addEventListener("click", () => {
            lightboxImg.src = src;
            lightbox.style.display = "flex";
        });
        galeria.appendChild(img);
    });

    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
        lightboxImg.src = "";
    });
});
