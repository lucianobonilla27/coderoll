document.addEventListener("DOMContentLoaded", function () {
    cargarDetalleCancion();
});

function cargarDetalleCancion() {
    // Obtener el código único de la canción de la URL
    const params = new URLSearchParams(window.location.search);
    const codigoCancion = params.get("codigo");

    // Obtener canciones desde localStorage
    const canciones = JSON.parse(localStorage.getItem('canciones')) || [];

    // Buscar la canción por su código
    const cancionSeleccionada = canciones.find(cancion => cancion.codigo === codigoCancion);


    // Seleccionar el elemento detalleCancion
    const detalleCancion = document.getElementById("detalleCancion");

    if (cancionSeleccionada && detalleCancion) {
        detalleCancion.innerHTML = `
    <h1>${cancionSeleccionada.titulo}</h1>
    <p><strong>Código único:</strong> ${cancionSeleccionada.codigo}</p>
    <p><strong>Artista:</strong> ${cancionSeleccionada.artista}</p>
    <p><strong>Categoría:</strong> ${cancionSeleccionada.categoria}</p>
    <p><strong>Duración:</strong> ${cancionSeleccionada.duracion}</p>
    <img src="${cancionSeleccionada.imagenUrl}" alt="${cancionSeleccionada.titulo}" class="img-fluid img-cancion">
    
`;
        reproducirCancion(cancionSeleccionada.cancionUrl)
    } else {
        console.error("Canción no encontrada o elemento detalleCancion no existe");
    }
}

// Reproduce la canción utilizando un widget de SoundCloud
function reproducirCancion(urlCancion) {
    // Elimina cualquier iframe existente
    var existingIframe = document.getElementById('soundcloudIframe');
    if (existingIframe) {
        existingIframe.parentNode.removeChild(existingIframe);
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
    // iframe.style.position = "fixed";
    // iframe.style.bottom = "0";
    // iframe.style.left = "0";

    // Agrega el nuevo iframe al cuerpo del documento
    detalleCancion.appendChild(iframe);
}
