// fomulario de contacto
const nombre = document.getElementById("nombreCompleto");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");
const mensaje = document.getElementById("mensajes");
const boton = document.getElementById("boton");


form.addEventListener("submit", e => {
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    parrafo.innerHTML = ""

    if (nombre.value.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Algo anda mal! ',
          })
        entrar = true
    }

    if (!regexEmail.test(email.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Algo anda mal! ',
            
          })
        entrar = true
    }
    if (phone.value.length < 12) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Algo anda mal!',
          })
        entrar = true
    }

    if (entrar) {
        parrafo.innerHTML = warnings
        
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Envio exitoso',
            showConfirmButton: false,
            timer: 1500
          })
    }

})


boton.addEventListener("mouseover", () => {
    boton.style.backgroundColor = "#333";
})

boton.addEventListener("mouseout", () => {
    boton.style.backgroundColor = '#d63031';
})

// modoOscuroConLocalStorage
const btnSwitch = document.querySelector('#switch');

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');

    // Guardamos el modo en localstorage.
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('dark-mode', 'true');
    } else {
        localStorage.setItem('dark-mode', 'false');
    }
});

// Obtenemos el modo actual.
if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark');
    btnSwitch.classList.add('active');
} else {
    document.body.classList.remove('dark');
    btnSwitch.classList.remove('active');
}