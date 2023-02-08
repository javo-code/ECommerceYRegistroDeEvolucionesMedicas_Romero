fetch('data/catalogoServicios.json')
    .then((resp) => resp.json())
    .then(data => console.log(data)
    )


mostrarCatalogoServicios()