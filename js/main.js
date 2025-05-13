document.addEventListener("DOMContentLoaded", function () {
  fetch("assets/noticias.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo de noticias");
      }
      return response.json();
    })
    .then((noticias) => {
      const contenedor = document.getElementById("contenedor-noticias");

      noticias.forEach((noticia) => {
        const noticiaDiv = document.createElement("div");
        noticiaDiv.classList.add("noticia");

        const titulo = document.createElement("h3");
        titulo.textContent = noticia.titulo;

        const contenido = document.createElement("p");
        contenido.textContent = noticia.contenido;

        noticiaDiv.appendChild(titulo);
        noticiaDiv.appendChild(contenido);

        contenedor.appendChild(noticiaDiv);
      });
    })
    .catch((error) => {
      console.error("Error al cargar noticias:", error);
    });
});


