document.addEventListener("DOMContentLoaded", function () {
    fetch("noticias.json")
        .then(response => response.json())
        .then(noticias => {
            const contenedor = document.getElementById("contenedor-noticias");

            noticias.forEach(noticia => {
                const noticiaDiv = document.createElement("div");
                noticiaDiv.classList.add("noticia");
                noticiaDiv.innerHTML = `
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.contenido}</p>
                    <small>${noticia.fecha}</small>
                `;
                contenedor.appendChild(noticiaDiv);
            });
        })
        .catch(error => console.error("Error al cargar las noticias:", error));
});

