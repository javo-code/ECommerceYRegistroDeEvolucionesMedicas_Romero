const stockProductos = [
  {
    id: 13,
    nombre: "Nutrilon",
    tipo: "alimento",
    desc: "Fórmula láctea de inicio en polvo, nutricionalmente completa con prebióticos GOS-FOS 9:1, para lactantes de 0-6 meses de edad, cuando la lactancia materna no es posible o es insuficiente. Libre de sacarosa y gluten.",
    precio: 9000,
    img: 'img/nutrilon.jpg',
    cantidad: 1
  },

  {
    id: 14,
    nombre: "Ensure",
    tipo: "alimento",
    desc: "Vitaminas, minerales, proteínas y grasas. Se añade al régimen alimentario de las personas para contribuir a formar huesos fuertes, recuperar los músculos y la fuerza, y ayudar al cuerpo a sanar después de una lesión o cirugía. Es posible tomarlo por boca o administrarlo mediante alimentación por sonda.",
    precio: 5000,
    img: 'img/ensure.jpg',
    cantidad: 1

  },

  {
    id: 15,
    nombre: "Lactoproteyn",
    tipo: "alimento",
    desc: "Caseinato de calcio instantáneo que permite enriquecer las preparaciones alimenticias con proteínas de elevado valor biológico, aportando todos los aminoácidos esenciales y no esenciales. Lactoproteyn® puede ser agregado a preparaciones dulces o saladas, frías o calientes.",
    precio: 7000,
    img: 'img/lactoproteyn.jpg',
    cantidad: 1
  },

  {
    id: 16,
    nombre: "Alfare",
    tipo: "alimento",
    desc: "Fórmula semielemental con proteína extensamente hidrolizada, de baja osmolaridad, cuya administración está particularmente indicada para la alimentación de niños con problemas de digestión y absorción, provocados por trastornos de tipo gastrointestina.",
    precio: 10000,
    img: 'img/alfare.jpg',
    cantidad: 1
  },

  {
    id: 17,
    nombre: "Fresubin",
    tipo: "alimento",
    desc: "Suplemento de proteína de suero de leche en polvo (polvo instantáneo), sin fibra. Además es clínicamente libre de lactosa y sin gluten. La proteína en polvo de Fresubin se utiliza para el tratamiento dietético de pacientes con riesgo de malnutrición relacionada con alguna enfermedad, en particular aquellas que incrementan las necesidades de proteínas, tales como, el cáncer, después de una cirugía, la sarcopenia y el retraso en el crecimiento pediátrico.",
    precio: 9500,
    img: 'img/fresubin.jpg',
    cantidad: 1
  },

  {
    id: 18,
    nombre: "Alterna",
    tipo: "alimento",
    desc: "Fórmula nutricional líquida de alta densidad calórico/proteica, para personas con estrés metabólico que pueden beneficiarse con la adición de arginina en su dieta. Puede ser utilizado como única fuente de nutrientes o como suplemento a la dieta, bajo supervisión médica.",
    precio: 9500,
    img: 'img/alterna.jpg',
    cantidad: 1
  }

];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if (formulario) {
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if (existe) {
    const prod = carrito.map(prod => {
      if (prod.id === id) {
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

function enviarCompra(e) {
  e.preventDefault()
  const cliente = document.querySelector('#cliente').value
  const email = document.querySelector('#correo').value

  if (email === '' || cliente == '') {
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
    })
  } else {

    const btn = document.getElementById('button');

    // document.getElementById('procesar-pago')
    //  .addEventListener('submit', function(event) {
    //    event.preventDefault();

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_qxwi0jn';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Finalizar compra';
        alert('Correo enviado!');
      }, (err) => {
        btn.value = 'Finalizar compra';
        alert(JSON.stringify(err));
      });

    const spinner = document.querySelector('#spinner')
    spinner.classList.add('d-flex')
    spinner.classList.remove('d-none')

    setTimeout(() => {
      spinner.classList.remove('d-flex')
      spinner.classList.add('d-none')
      formulario.reset()

      const alertExito = document.createElement('p')
      alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
      alertExito.textContent = 'Compra realizada correctamente'
      formulario.appendChild(alertExito)

      setTimeout(() => {
        alertExito.remove()
      }, 3000)


    }, 3000)
  }
  localStorage.clear()

}