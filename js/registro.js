const formRegis = document.querySelector('#formRegis');
let bandera = 0;

formRegis.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const existe = pattern.test(email);

    console.log(username, password, email);

    if (existe) {
        try {
            const response = await fetch("../api/fakeApi.json");
            const user = await response.json();

            console.log(user);

            const userRegis = user.find((user) => user.username === username);
        
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userRegistrado = users.find((users) => users.username == username);

            if (userRegis || userRegistrado) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El usuario ya está registrado'
                });
                localStorage.removeItem("users");
                bandera = 1;
            }

            users.push({ username: username, email: email.toLowerCase(), password: password });
            localStorage.setItem("users", JSON.stringify(users));

            if (bandera !== 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Usuario registrado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = "../index.html";
                });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Correo electrónico no válido'
        });
    }
});
