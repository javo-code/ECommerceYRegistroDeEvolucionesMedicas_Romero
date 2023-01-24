const mostrarProductos = (productos) => {
    const contenedor = document.getElementById("producto-contenedor");

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML += `
            <div class="card-image">
                <img src=${producto.img}>
                <span class="card-title">${producto.nombre}</span>
                <a class="btn-floating halfway-fab wabes-effect waves-light green"><i id=${producto.id} class="material-icons agregar">add_shopping_cart</i></a>
                    </div>
                        <div class="card-content">
                            <p>${producto.descripcion}</p>
                            <br>
                            <p>Precio: $${producto.precio},00</p>
            </div>
        `
        contenedor.appendChild(div);
    });
};