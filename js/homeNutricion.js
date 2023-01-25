const pintarProductos = (productos) => {
    const contenedor = document.getElementById("producto-contenedor");

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML += `
            <div class="card-image">
                <img src=${producto.imagen}>
                <span class="card-title">${producto.nombre}</span>
                </div>
                <div class="card-content">
                <p>${producto.desc}</p>
                <br>
                <p class="card-precio">Precio por unidad: $ ${producto.precio},00 </p>
                <a class="btn-floating halfway-fab wabes-effect waves-light green"><i id=${producto.id} class="material-icons agregar">add_shopping_cart</i></a>
            </div>
        `
        contenedor.appendChild(div);
    });
};