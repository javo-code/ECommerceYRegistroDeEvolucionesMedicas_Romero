//variable contenedora de los productos del usuario
let carrito = []

//Funcion mostrar productos por el DOM

const productoContenedor = document.getElementById('producto-contenedor')

productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoRepetido(e.target.id)
    }
})

const validarProductoRepetido = (productoId) => {
    const productoRepetido = carrito.find(prodducto => prodducto.id == productoId)

    if (!productoRepetido) {
        const producto = productos.find(producto => producto.id == productoId)
        carrito.push(producto)
        mostrarProductoCarrito(producto)
        actualizarTotalesCarrito(carrito)
    } else {
        productoRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`)
        cantidadProducto.innerText = `cantidad ${productoRepetido.cantidad}`
        actualizarTotalesCarrito(carrito)
    }
};

const mostrarProductoCarrito = (producto) => {
    const contenedor = document.getElementById('carrito-contenedor')
    const div = document.createElement('div')
    div.classList.add('productoCarrito')
    div.innerHTML = `
    <p>${producto.nombre}</p>
    <p>Precio: $${producto.precio},00 </p>
    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
    <button class="btn waves-effect waves-ligth boton-eliminar" value="">X</button>
    `
    contenedor.appendChild(div)
};

const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((accum, articulo) => accum + articulo.cantidad, 0)
    const totalCompra = carrito.reduce((accum, articulo) => accum + (articulo.precio * articulo.cantidad), 0)

    mostrarTotalesCarrito(totalCantidad, totalCompra)
};

const mostrarTotalesCarrito = (totalCantidad, totalCompra) => {

    const contadorCarrito = document.getElementById('contador-carrito')
    const precioTotal = document.getElementById('precioTotal')

    contadorCarrito.innerText = totalCantidad
    precioTotal.innerText = totalCompra
};

const eliminarProductosCarrito = (productoId) => {
    const productoIndex = carrito.findIndex(producto => producto.id == productoId)
    carrito.splice(productoIndex, 1)
}


