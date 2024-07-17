const formLog = document.querySelector('#formLogin');

formLog.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const existe = pattern.test(email);

    console.log(email, password);

    if (existe) {
        try {
            const response = await fetch("../api/fakeApi.json");
            const user = await response.json();

            const userLogued = user.find(
                (user) => user.password === password && user.email === email
            );

            if (email === "admin@gmail.com" && password === "admin") {
                window.location.href = "../html/administracion.html";
                sessionStorage.setItem('token', 'admin');
                
                
            }

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userValid = users.find(users => users.email == email);

            if (userLogued || userValid) {
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = "../index.html";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Email o contraseña incorrectos'
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


function cerrarSesion(){
    localStorage.removeItem("username")
    sessionStorage.removeItem('token');
    window.location.href = '../index.html'
}





