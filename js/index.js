// Obtener canciones desde localStorage
const canciones = JSON.parse(localStorage.getItem('canciones')) || [];

function cargarCatalogo() {
    const catalogoCanciones = document.getElementById("catalogoCanciones");
    catalogoCanciones.innerHTML = "";

    canciones.forEach((cancion) => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";

        // Enlace que envuelve toda la tarjeta
        const enlace = document.createElement("a");
        enlace.href = `../html/detalle.html?codigo=${cancion.codigo}`;
        enlace.className = "text-decoration-none text-dark"; // Clases para quitar el subrayado y mantener el texto oscuro

        const card = document.createElement("div");
        card.className = "card bg-light text-dark";

        const img = document.createElement("img");
        img.src = cancion.imagenUrl; // Asegúrate de tener una URL de miniatura en tus datos de canciones
        img.className = "card-img-top";
        img.alt = `Miniatura de ${cancion.titulo}`;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const titulo = document.createElement("h5");
        titulo.className = "card-title";
        titulo.textContent = cancion.titulo; // Solo el título sin enlace

        const artista = document.createElement("p");
        artista.className = "card-text";
        artista.innerHTML = `Artista: ${cancion.artista}`;

        const boton = document.createElement("button");
        boton.textContent = 'Reproducir';
        boton.className = 'btn btn-primary';

        boton.addEventListener('click', (e) => {
            e.preventDefault(); // Evita el comportamiento por defecto del enlace
            e.stopPropagation(); // Evita que el clic en el botón active el enlace
            reproducirCancion(cancion.cancionUrl);
        });

        cardBody.appendChild(titulo);
        cardBody.appendChild(artista);
        cardBody.appendChild(boton);

        card.appendChild(img);
        card.appendChild(cardBody);

        // Agregar el card dentro del enlace
        enlace.appendChild(card);
        col.appendChild(enlace);
        catalogoCanciones.appendChild(col);
    });
}






function buscar() {
    const busquedaInput = document.getElementById("busquedaInput").value.toLowerCase();
    const catalogoCanciones = document.getElementById("catalogoCanciones");
    catalogoCanciones.innerHTML = "";

    for (let i = 0; i < canciones.length; i++) {
        const cancion = canciones[i];
        if (cancion.titulo.toLowerCase().includes(busquedaInput) || cancion.artista.toLowerCase().includes(busquedaInput)) {
            const col = document.createElement("div");
            col.className = "col-md-4 mb-4";

            // Enlace que envuelve toda la tarjeta
            const enlace = document.createElement("a");
            enlace.href = `../html/detalle.html?codigo=${cancion.codigo}`;
            enlace.className = "text-decoration-none text-dark"; // Clases para quitar el subrayado y mantener el texto oscuro

            const card = document.createElement("div");
            card.className = "card bg-light text-dark";

            const img = document.createElement("img");
            img.src = cancion.imagenUrl; // Asegúrate de tener una URL de miniatura en tus datos de canciones
            img.className = "card-img-top";
            img.alt = `Miniatura de ${cancion.titulo}`;

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const titulo = document.createElement("h5");
            titulo.className = "card-title";
            titulo.textContent = cancion.titulo; // Solo el título sin enlace

            const artista = document.createElement("p");
            artista.className = "card-text";
            artista.innerHTML = `Artista: ${cancion.artista}`;

            const boton = document.createElement("button");
            boton.textContent = 'Reproducir';
            boton.className = 'btn btn-primary';

            boton.addEventListener('click', (e) => {
                e.preventDefault(); // Evita el comportamiento por defecto del enlace
                e.stopPropagation(); // Evita que el clic en el botón active el enlace
                reproducirCancion(cancion.cancionUrl);
            });

            cardBody.appendChild(titulo);
            cardBody.appendChild(artista);
            cardBody.appendChild(boton);

            card.appendChild(img);
            card.appendChild(cardBody);

            // Agregar el card dentro del enlace
            enlace.appendChild(card);
            col.appendChild(enlace);
            catalogoCanciones.appendChild(col);
        }
    }
}






// Reproduce la canción utilizando un widget de SoundCloud
// Declarar una variable global para almacenar la referencia al botón
var closeButton;

function reproducirCancion(urlCancion) {
    // Elimina cualquier iframe existente
    var existingIframe = document.getElementById('soundcloudIframe');
    if (existingIframe) {
        existingIframe.parentNode.removeChild(existingIframe);
        ocultarBotonCerrar();
    }

    // Reemplaza el enlace de SoundCloud con el enlace de tu canción
    var soundcloudEmbedUrl = "https://w.soundcloud.com/player/?url=" + encodeURIComponent(urlCancion) + "&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true";

    // Crea un nuevo iframe para el widget de SoundCloud
    var iframe = document.createElement('iframe');
    iframe.id = 'soundcloudIframe';
    iframe.width = "100%";
    iframe.height = "100";
    iframe.allow = "autoplay";
    iframe.src = soundcloudEmbedUrl;

    // Establece la posición fija y la alineación en la parte inferior
    iframe.style.position = "fixed";
    iframe.style.bottom = "0";
    iframe.style.left = "0";

    // Agrega el nuevo iframe al cuerpo del documento
    document.body.appendChild(iframe);

    // Agrega un botón de cerrar en la parte inferior derecha del iframe
    closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar Reproductor';
    closeButton.classList.add('btn', 'btn-danger');
    closeButton.style.position = 'fixed';
    closeButton.style.bottom = '50px';
    closeButton.style.right = '10px';
    closeButton.onclick = function () {
        cerrarIframe();
    };
    document.body.appendChild(closeButton);
}

function cerrarIframe() {
    var existingIframe = document.getElementById('soundcloudIframe');
    if (existingIframe) {
        existingIframe.parentNode.removeChild(existingIframe);
        ocultarBotonCerrar();
    }
}

function ocultarBotonCerrar() {
    if (closeButton) {
        closeButton.style.display = 'none';
    }
}




// Llama a cargarCatalogo para inicializar la página
cargarCatalogo();

// Agrega un event listener para la búsqueda
document.getElementById("busquedaInput").addEventListener("input", buscar);
