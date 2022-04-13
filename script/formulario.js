// fomulario de contacto
const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area");

form.onsubmit = (e)=>{
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Enviando mensaje..."
  form.classList.add("disabled");

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "message.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("Email and message field is required!") != -1 || response.indexOf("Enter a valid email address!") != -1 || response.indexOf("Sorry, failed to send your message!") != -1){
        statusTxt.style.color = "red";
      }else{
        form.reset();
        setTimeout(()=>{
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}



// const nombre = document.getElementById("nombreCompleto");
// const email = document.getElementById("email");
// const phone = document.getElementById("phone");
// const form = document.getElementById("form");
// const parrafo = document.getElementById("warnings");
// const mensaje = document.getElementById("mensajes");
// const boton = document.getElementById("boton");



            
    // if (true){
        
    //     Swal.fire({
    //         position: 'top-end',
    //         icon: 'success',
    //         title: 'Envio exitoso',
    //         showConfirmButton: false,
    //         timer: 1500
    //     })
        
    // }else{
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: 'Algo anda mal! ',

    //     })
        
    // };




boton.addEventListener("mouseover", () => {
    boton.style.backgroundColor = "#333";
})

boton.addEventListener("mouseout", () => {
    boton.style.backgroundColor = '#d63031';
})
//enter para enviar 
function usrpas() {
    let entrar = false
    if (entrar) {
        parrafo.innerHTML = warnings
    }
}
usrpas();


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