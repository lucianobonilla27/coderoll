// Obtener canciones desde localStorage
const canciones = JSON.parse(localStorage.getItem('canciones')) || [];

document.addEventListener('DOMContentLoaded', function() {
    cargarCancionesDesdeLocalStorage();

    // Agregar canciones de ejemplo si no hay canciones en localStorage
    if (Administracion.canciones.length === 0) {
        const cancionesEjemplo = [
            {
                codigo: "1",
                titulo: "Bohemian Rhapsody",
                artista: "Queen",
                categoria: "Rock",
                imagenUrl: "https://imageio.forbes.com/blogs-images/simonthompson/files/2018/12/queen_large_2500-1200x1203.jpg?height=712&width=711&fit=bounds",
                duracion: "5:55",
                cancionUrl: "https://soundcloud.com/rizky-rilos/queen-bohemian-rhapsody?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
            },
            {
                codigo: "2",
                titulo: "Shape of You",
                artista: "Ed Sheeran",
                categoria: "Pop",
                imagenUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png/220px-Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
                duracion: "3:54",
                cancionUrl: "https://soundcloud.com/jamescarterpresents/shape-of-you?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
            },
            {
                codigo: "3",
                titulo: "Billie Jean",
                artista: "Michael Jackson",
                categoria: "Pop",
                imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQodev9KYKKJg_pXgiAVs5pT00VbTtqGGn01lsDuhjosw&s",
                duracion: "4:54",
                cancionUrl: "https://soundcloud.com/maitre80/billie-jean-michael-jackson?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
            },
            {
                codigo: "4",
                titulo: "Payphone",
                artista: "Maroon 5(feat. Wiz Khalifa)",
                categoria: "Pop",
                imagenUrl: "https://cdns-images.dzcdn.net/images/cover/81d7aae96ab55297abdfd5370f6b38a0/350x350.jpg",
                duracion: "3:51",
                cancionUrl: "https://soundcloud.com/maroon-5/payphone?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
            },
            {
                codigo: "5",
                titulo: "Hotel California",
                artista: "Eagles",
                categoria: "Rock",
                imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkEG90NrK8NYzs2DovQGUsJMMliZ4eSEWHEQ&usqp=CAU",
                duracion: "6:30",
                cancionUrl: "https://soundcloud.com/emblem3/hotel-california?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
            },
            {
                codigo: "6",
                titulo: "Despacito",
                artista: "Luis Fonsi (feat. Daddy Yankee)",
                categoria: "Reggaeton",
                imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVL6Q4dT-QwGad9f40TbLRrmj1Rs6oeNTwDA&usqp=CAU",
                duracion: "4:41",
                cancionUrl: "https://soundcloud.com/dkdavid1/luis-fonsi-despacito-ft-daddy-yankee-original-audio-from-youtube?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
            },
        ];

        cancionesEjemplo.forEach(nuevaCancion => {
            Administracion.agregarCancion(nuevaCancion);
        });
    }

    actualizarCancionesEnIndex();
});

const Administracion = {
    canciones: [],
    cargarCancionesDesdeLocalStorage: function() {
        const storedCanciones = localStorage.getItem('canciones');
        if (storedCanciones) {
            this.canciones = JSON.parse(storedCanciones);
        }
    },
    guardarCancionesEnLocalStorage: function() {
        localStorage.setItem('canciones', JSON.stringify(this.canciones));
    },
    agregarCancion: function(cancion) {
        this.canciones.push(cancion);
        this.guardarCancionesEnLocalStorage();
    }
};

function cargarCancionesDesdeLocalStorage() {
    Administracion.cargarCancionesDesdeLocalStorage();
}

function actualizarCancionesEnIndex() {
    // Aquí va el código que actualiza el contenido de la página principal con las canciones cargadas
    // Por ejemplo, podrías llenar una tabla o una lista con las canciones
    const cancionesContainer = document.getElementById('cancionesContainer');
    if (cancionesContainer) {
        cancionesContainer.innerHTML = '';
        Administracion.canciones.forEach(cancion => {
            const cancionElement = document.createElement('div');
            cancionElement.innerHTML = `
                <h3>${cancion.titulo}</h3>
                <p>Artista: ${cancion.artista}</p>
                <p>Categoría: ${cancion.categoria}</p>
                <img src="${cancion.imagenUrl}" alt="${cancion.titulo}" class="imagen-cancion">
                <button onclick="reproducirCancion('${cancion.cancionUrl}')">Reproducir</button>
            `;
            cancionesContainer.appendChild(cancionElement);
        });
    }
}

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
