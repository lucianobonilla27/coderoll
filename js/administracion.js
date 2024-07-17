document.addEventListener('DOMContentLoaded', function () {
    if (!isAuthenticated()) {
        // Redireccionar o tomar alguna acción si el usuario no está autenticado
        window.location.href = '../index.html';
    }


});


const Cancion = {
    generarCodigo: function () {
        return Math.random().toString(36).substring(7);
    },
};

const Administracion = {
    canciones: [],

    cargarCancionesDesdeLocalStorage: function () {
        const storedCanciones = localStorage.getItem('canciones');
        if (storedCanciones) {
            this.canciones = JSON.parse(storedCanciones);
        }
    },

    guardarCancionesEnLocalStorage: function () {
        localStorage.setItem('canciones', JSON.stringify(this.canciones));
    },


    limpiarFormulario: function () {
        // Limpiar los campos del formulario
        document.getElementById('titulo').value = '';
        document.getElementById('artista').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('imagenUrl').value = '';
        document.getElementById('duracion').value = '';
        document.getElementById('cancionUrl').value = '';
    },

    agregarCancion: function (cancion) {
        this.canciones.push(cancion);
        this.guardarCancionesEnLocalStorage();
        this.actualizarTabla();
    },

    editarCancion: function (codigo, nuevaCancion) {
        const index = this.canciones.findIndex(cancion => cancion.codigo === codigo);

        if (index !== -1) {
            this.canciones[index] = nuevaCancion;
            this.actualizarTabla();
            this.guardarCancionesEnLocalStorage();

        }
    },

    abrirModalConfirmarEliminar: function (codigo) {


        const modal = new bootstrap.Modal(document.getElementById('confirmarEliminarModal'));
        modal.show();

        const confirmarEliminarButton = document.getElementById('confirmarEliminarButton');
        confirmarEliminarButton.onclick = () => this.eliminarCancion(codigo);
    },

    eliminarCancion: function (codigo) {
        this.canciones = this.canciones.filter(cancion => cancion.codigo !== codigo);
        this.guardarCancionesEnLocalStorage();
        this.actualizarTabla();


    },



    guardarCancion: function () {

        const titulo = document.getElementById('titulo').value;
        const artista = document.getElementById('artista').value;
        const categoria = document.getElementById('categoria').value;
        const imagenUrl = document.getElementById('imagenUrl').value;
        const duracion = document.getElementById('duracion').value;
        const cancionUrl = document.getElementById('cancionUrl').value;


        if (!titulo || !artista || !categoria || !imagenUrl || !duracion || !cancionUrl) {
            alert('Por favor, complete todos los campos.');
            return;
        }


        const nuevaCancion = {
            codigo: Cancion.generarCodigo(),
            titulo: titulo,
            artista: artista,
            categoria: categoria,
            imagenUrl: imagenUrl,
            duracion: duracion,
            cancionUrl: cancionUrl
        };


        this.agregarCancion(nuevaCancion);
        this.limpiarFormulario();
    },


    actualizarTabla: function () {
        const adminTableBody = document.getElementById('adminTableBody');
        if (adminTableBody) {
            adminTableBody.innerHTML = '';

            this.canciones.forEach(cancion => {
                const row = adminTableBody.insertRow();
                row.insertCell(0).textContent = cancion.codigo;
                row.insertCell(1).textContent = cancion.titulo;
                row.insertCell(2).textContent = cancion.artista;
                row.insertCell(3).textContent = cancion.categoria;

                const imagenCell = row.insertCell(4);
                const imagen = document.createElement('img');
                imagen.src = cancion.imagenUrl;
                imagen.alt = cancion.titulo;
                imagen.classList.add('imagen-cancion');
                imagenCell.appendChild(imagen);

                const accionesCell = row.insertCell(5);

                // Botón Reproducir
                const reproducirButton = document.createElement('button');
                reproducirButton.textContent = 'Reproducir';
                reproducirButton.classList.add('btn', 'btn-success', 'btn-sm');
                reproducirButton.onclick = () => this.reproducirCancion(cancion.cancionUrl);
                accionesCell.appendChild(reproducirButton);

                // Botón Editar
                const editarButton = document.createElement('button');
                editarButton.textContent = 'Editar';
                editarButton.classList.add('btn', 'btn-warning', 'btn-sm');
                editarButton.onclick = () => this.abrirFormularioEditar(cancion);
                accionesCell.appendChild(editarButton);

                // Botón Eliminar
                const eliminarButton = document.createElement('button');
                eliminarButton.textContent = 'Eliminar';
                eliminarButton.classList.add('btn', 'btn-danger', 'btn-sm');
                eliminarButton.onclick = () => this.abrirModalConfirmarEliminar(cancion.codigo);
                accionesCell.appendChild(eliminarButton);
            });
        }
    },

    reproducirCancion: function (urlCancion) {
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
        iframe.style.position = "fixed";
        iframe.style.bottom = "0";
        iframe.style.left = "0";

        // Agrega el nuevo iframe al cuerpo del documento
        document.body.appendChild(iframe);
    },



    abrirFormularioEditar: function (cancion) {

        document.getElementById('tituloE').value = cancion.titulo;
        document.getElementById('artistaE').value = cancion.artista;
        document.getElementById('categoriaE').value = cancion.categoria;
        document.getElementById('imagenUrlE').value = cancion.imagenUrl;
        document.getElementById('duracionE').value = cancion.duracion;
        document.getElementById('cancionUrlE').value = cancion.cancionUrl;


        const modal = new bootstrap.Modal(document.getElementById('editarModal'));
        modal.show();


        document.getElementById('guardarButton').onclick = () => this.guardarEdicionCancion(cancion.codigo);



    },

    guardarEdicionCancion: function (codigo) {

        const titulo = document.getElementById('tituloE').value.trim();
        const artista = document.getElementById('artistaE').value.trim();
        const categoria = document.getElementById('categoriaE').value.trim();
        const imagenUrl = document.getElementById('imagenUrlE').value.trim();
        const duracion = document.getElementById('duracionE').value.trim();
        const cancionUrl = document.getElementById('cancionUrlE').value.trim();

        // Realizar validaciones
        if (!titulo || !artista || !categoria || !imagenUrl || !duracion || !cancionUrl) {
            alert('Por favor, complete todos los campos.');
            return;
        }




        const nuevaCancion = {
            codigo,
            titulo,
            artista,
            categoria,
            imagenUrl,
            duracion,
            cancionUrl,
        };


        this.editarCancion(codigo, nuevaCancion);

    },




};

// Cargar canciones almacenadas en localStorage al cargar la página
Administracion.cargarCancionesDesdeLocalStorage();

// Agregar tres canciones de ejemplo si no hay canciones en localStorage
if (Administracion.canciones.length === 0) {
    const cancionesEjemplo = [
        {
            codigo: Cancion.generarCodigo(),
            titulo: "Bohemian Rhapsody",
            artista: "Queen",
            categoria: "Rock",
            imagenUrl: "https://imageio.forbes.com/blogs-images/simonthompson/files/2018/12/queen_large_2500-1200x1203.jpg?height=712&width=711&fit=bounds",
            duracion: "5:55",
            cancionUrl: "https://soundcloud.com/rizky-rilos/queen-bohemian-rhapsody?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        },
        {
            codigo: Cancion.generarCodigo(),
            titulo: "Shape of You",
            artista: "Ed Sheeran",
            categoria: "Pop",
            imagenUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png/220px-Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
            duracion: "3:54",
            cancionUrl: "https://soundcloud.com/jamescarterpresents/shape-of-you?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        },
        {
            codigo: Cancion.generarCodigo(),
            titulo: "Billie Jean",
            artista: "Michael Jackson",
            categoria: "Pop",
            imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQodev9KYKKJg_pXgiAVs5pT00VbTtqGGn01lsDuhjosw&s",
            duracion: "4:54",
            cancionUrl: "https://soundcloud.com/maitre80/billie-jean-michael-jackson?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        },
        {
            codigo: Cancion.generarCodigo(),
            titulo: "Payphone",
            artista: "Maroon 5(feat. Wiz Khalifa)",
            categoria: "Pop",
            imagenUrl: "https://cdns-images.dzcdn.net/images/cover/81d7aae96ab55297abdfd5370f6b38a0/350x350.jpg",
            duracion: "3:51",
            cancionUrl: "https://soundcloud.com/maroon-5/payphone?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        },
        {
            codigo: Cancion.generarCodigo(),
            titulo: "Hotel California",
            artista: "Eagles",
            categoria: "Rock",
            imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkEG90NrK8NYzs2DovQGUsJMMliZ4eSEWHEQ&usqp=CAU",
            duracion: "6:30",
            cancionUrl: "https://soundcloud.com/emblem3/hotel-california?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
        },
        {
            codigo: Cancion.generarCodigo(),
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

// Actualizar la tabla al cargar la página
Administracion.actualizarTabla();


document.addEventListener("DOMContentLoaded", function () {
    const adminUser = { name: "Admin", email: "admin@example.com", password: "admin123", role: "admin" };
    const guestUser = { name: "Invitado", email: "guest@example.com", password: "guest123", role: "guest" };

    // Verificar si los usuarios ya existen antes de agregarlos
    if (!getUserByEmail(adminUser.email)) {
        saveUser(adminUser);
    }

    if (!getUserByEmail(guestUser.email)) {
        saveUser(guestUser);
    }

    updateAdminPanel();
});


function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function getUserByEmail(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}

function updateAdminPanel() {
    const userTableBody = document.getElementById('userTableBody');
    if (userTableBody) {
        userTableBody.innerHTML = '';

        const users = getUsers();

        users.forEach(user => {
            const row = userTableBody.insertRow();
            if (user.name == "Admin" || user.name == "Invitado") {
                row.insertCell(0).textContent = user.name;
            } else {
                row.insertCell(0).textContent = user.username;
            }
            row.insertCell(1).textContent = user.email;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.onclick = () => showDeleteModal(user.email);

            const cell = row.insertCell(2);
            cell.appendChild(deleteButton);
        });
    }
}

function showDeleteModal(email) {
    const modal = document.getElementById('deleteUserModal');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');

    // Configura el manejador de eventos para el botón de confirmación
    confirmDeleteButton.onclick = () => deleteUser(email);

    // Muestra el modal
    $(modal).modal('show');
}

function deleteUser(email) {
    let users = getUsers();
    users = users.filter(user => user.email !== email);
    localStorage.setItem('users', JSON.stringify(users));

    // Oculta el modal después de eliminar al usuario
    const modal = document.getElementById('deleteUserModal');
    $(modal).modal('hide');

    updateAdminPanel();
}

function saveUser(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function getUserByEmail(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}


// Función para verificar si el usuario está autenticado
function isAuthenticated() {
    // Obtener el token almacenado en sessionStorage
    const token = sessionStorage.getItem('token');

    // Validar la existencia del token
    return token !== null && token !== undefined;
}