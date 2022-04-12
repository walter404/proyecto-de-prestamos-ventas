function limpiar() {
    document.getElementById('miFormulario').reset();
}

function gen_table() {
    document.getElementById("tab").innerHTML = "";
    let n = Number(document.getElementById("capital").value);
    let n2 = Number(document.getElementById("couta").value);
    let n3 = Number(document.getElementById("interes").value);
    if (n > 0) {
        for (i = 1; i <= n2; i++) {
            ca = n / n2;
            d1 = ca.toFixed(2);
            i2 = ((n * n3) / 100) / n2;
            d2 = i2.toFixed(2);
            r = ca + i2;
            d3 = r.toFixed(2);
            document.getElementById("tab").innerHTML = document.getElementById("tab").innerHTML +
                `<tr>
                        <td> ${i}</td>
                        <td> ${d1}</td>
                        <td> ${d2}</td>
                        <td> ${d3}</td>
                    </tr>`;
        }
        n1 = n.toFixed(2);
        t_i = i2 * n2;
        d4 = t_i.toFixed(2);
        t_p = r * n2;
        d5 = t_p.toFixed(2);
        document.getElementById("t1").innerHTML = n1;
        document.getElementById("t2").innerHTML = d4;
        document.getElementById("t3").innerHTML = d5;
    } else {
        alert("Falta ingresar un Número");
    }
}

// datos enviados 
function enviar() {
    // console.log("enviar");
    function Persona(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    let nombreCapturar = document.getElementById("nombre").value;

    let edadCapturar = document.getElementById("edad").value;

    nuevoSujeto = new Persona(nombreCapturar, edadCapturar);
    // console.log(nuevoSujeto);
    agregar();
}
const baseDatos = [];

function agregar() {
    baseDatos.push(nuevoSujeto);
    // console.log(baseDatos);
    document.getElementById("tabla").innerHTML += '<tbody><td>' + nuevoSujeto.nombre + '</td><td>' + nuevoSujeto.edad + '</td></tbody>';
};

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


// filtracion

const provincias = [{
        nombre: 'Buenos Aires',
        localidad: 'Mar de Plata'
    },
    {
        nombre: 'Cordoba',
        localidad: 'Carlo Paz'
    },
    {
        nombre: 'Mendoza',
        localidad: 'San Carlos'
    },
    {
        nombre: 'Entre Rios',
        localidad: 'Parana'
    },
    {
        nombre: 'Jujuy',
        localidad: 'San Pedro'
    },
]

const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor)
};

const formulario = document.querySelector('#formulario');
const boton = document.querySelector('#boton');
const resultado = document.querySelector('#resultado');

const filtrar = () => {
    // console.log(formulario.value);
    resultado.innerHTML = '';

    const texto = formulario.value.toLowerCase();

    for (const provincia of provincias) {
        // local 
        guardarLocal(provincia.nombre, JSON.stringify(provincia));

        let nombre = provincia.nombre.toLowerCase();

        if (nombre.indexOf(texto) !== -1) {
            resultado.innerHTML += `
                <li>${provincia.nombre} - localidad: ${provincia.localidad}</li>
                `
        }
    }
    if (resultado.innerHTML === '') {
        resultado.innerHTML += `
            <li>Provincia no encontrado ...</li>
            `
    }
    guardarLocal("listaProvincias", JSON.stringify(provincias));
}
boton.addEventListener('click', filtrar);

//apis de divisas
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#currency-form').onsubmit = () => {
        const base = document.getElementById('currency-from').value;
        fetch(`https://api.exchangerate.host/latest?/source=ecb&base=${base}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                const amount = document.querySelector("#input-amount").value;
                const currencyTo = document.getElementById('currency-to').value;
                const rate = data.rates[currencyTo];

                function convert() {
                    return amount * rate;
                }
                document.querySelector('.display-result').innerHTML = `${amount} ${base.toUpperCase()} equal to ${currencyTo} ${convert().toFixed(4)}`;
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
        return false;
    };
});