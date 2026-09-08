// =====================================================
// SEMANA 5 - MANIPULACIÓN DEL DOM CON JAVASCRIPT
// Desarrollo Frontend I - PFY2201
// =====================================================


// -----------------------------------------------------
// FUNCIÓN: crearOfertaDelDia
// Crea dinámicamente una promoción destacada utilizando
// createElement y appendChild. Además, implementa click.
// -----------------------------------------------------

function crearOfertaDelDia() {

    const seccionProductos = document.querySelector("#productos");

    const encabezadoProductos =
        seccionProductos.querySelector(".text-center.mb-5");


    const contenedorOferta = document.createElement("div");

    contenedorOferta.classList.add(
        "promo-notebook",
        "text-center"
    );


    const contenido = document.createElement("div");

    contenido.classList.add("promo-contenido");


    const etiquetaOferta = document.createElement("span");

    etiquetaOferta.textContent = "PROMOCIÓN ESPECIAL";

    etiquetaOferta.classList.add("promo-etiqueta");


    const tituloOferta = document.createElement("h2");

    tituloOferta.textContent = "Día del Notebook";

    tituloOferta.classList.add("promo-titulo");


    const botonOferta = document.createElement("button");

    botonOferta.textContent = "Ver promoción";

    botonOferta.classList.add("promo-boton");


    const bloqueDescuento = document.createElement("div");

    bloqueDescuento.classList.add(
        "promo-descuento",
        "d-none"
    );


    const textoHasta = document.createElement("span");

    textoHasta.textContent = "Hasta";

    textoHasta.classList.add("promo-hasta");


    const descuento = document.createElement("span");

    descuento.textContent = "25% DE DESCUENTO";

    descuento.classList.add("promo-porcentaje");


    bloqueDescuento.appendChild(textoHasta);

    bloqueDescuento.appendChild(descuento);


    botonOferta.addEventListener("click", function () {

        bloqueDescuento.classList.toggle("d-none");


        if (bloqueDescuento.classList.contains("d-none")) {

            botonOferta.textContent = "Ver promoción";

            bloqueDescuento.classList.remove("promo-aparecer");

        } else {

            botonOferta.textContent = "Ocultar promoción";

            bloqueDescuento.classList.add("promo-aparecer");

        }

    });


    contenido.appendChild(etiquetaOferta);

    contenido.appendChild(tituloOferta);

    contenido.appendChild(botonOferta);

    contenido.appendChild(bloqueDescuento);


    contenedorOferta.appendChild(contenido);


    seccionProductos.insertBefore(
        contenedorOferta,
        encabezadoProductos
    );

}


// -----------------------------------------------------
// FUNCIÓN: configurarEventosTarjetas
// Crea dinámicamente la descripción de cada producto.
// La descripción permanece oculta y se muestra mediante
// el evento mouseover.
// -----------------------------------------------------

function configurarEventosTarjetas() {

    const tarjetas = document.querySelectorAll("#productos .card");


    tarjetas.forEach(function (tarjeta) {

        const descripcion = tarjeta.dataset.descripcion;

        const cuerpoTarjeta = tarjeta.querySelector(".card-body");

        const boton = tarjeta.querySelector(".btn");


        const textoDescripcion = document.createElement("p");

        textoDescripcion.textContent = descripcion;

        textoDescripcion.classList.add(
            "card-text",
            "d-none"
        );


        cuerpoTarjeta.insertBefore(
            textoDescripcion,
            boton
        );


        tarjeta.addEventListener("mouseover", function () {

            textoDescripcion.classList.remove("d-none");

        });


        tarjeta.addEventListener("mouseleave", function () {

            textoDescripcion.classList.add("d-none");

        });

    });

}


// -----------------------------------------------------
// FUNCIÓN: configurarFormularioContacto
// Procesa el evento submit del formulario.
// -----------------------------------------------------

function configurarFormularioContacto() {

    const formulario = document.querySelector(".formulario-contacto");


    if (!formulario) {

        return;

    }


    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();


        const nombre =
            document.querySelector("#nombre").value.trim();

        const correo =
            document.querySelector("#correo").value.trim();

        const mensaje =
            document.querySelector("#mensaje").value.trim();


        const mensajeAnterior =
            document.querySelector("#mensajeFormulario");


        if (mensajeAnterior) {

            mensajeAnterior.remove();

        }


        const respuesta = document.createElement("div");

        respuesta.id = "mensajeFormulario";

        respuesta.classList.add(
            "alert",
            "mt-3",
            "text-center"
        );


        if (
            nombre === "" ||
            correo === "" ||
            mensaje === ""
        ) {

            respuesta.classList.add("alert-danger");

            respuesta.textContent =
                "Por favor, completa todos los campos obligatorios.";

        } else {

            respuesta.classList.add("alert-success");

            respuesta.textContent =
                "Gracias, " +
                nombre +
                ". Tu mensaje fue enviado correctamente.";


            formulario.reset();

        }


        formulario.appendChild(respuesta);

    });

}


// -----------------------------------------------------
// FUNCIÓN: cargarProductosDestacados
// Utiliza Fetch API para obtener información desde un
// archivo JSON y posteriormente mostrarla en el DOM.
// -----------------------------------------------------

function cargarProductosDestacados() {

    fetch("data/productos.json")

        .then(function (respuesta) {

            if (!respuesta.ok) {

                throw new Error(
                    "No fue posible cargar los productos."
                );

            }

            return respuesta.json();

        })


        .then(function (productos) {

            mostrarProductosDestacados(productos);

        })


        .catch(function (error) {

            mostrarErrorCarga(error);

        });

}


// -----------------------------------------------------
// FUNCIÓN: mostrarProductosDestacados
// Recibe los productos obtenidos mediante Fetch API y
// crea dinámicamente tarjetas con imagen, nombre,
// categoría, descripción y precio.
// -----------------------------------------------------

function mostrarProductosDestacados(productos) {

    const main = document.querySelector("main");


    const seccion = document.createElement("section");

    seccion.id = "destacados";

    seccion.classList.add(
        "container",
        "py-5"
    );


    const encabezado = document.createElement("div");

    encabezado.classList.add(
        "text-center",
        "mb-5"
    );


    const titulo = document.createElement("h2");

    titulo.classList.add("fw-bold");

    titulo.textContent = "Productos destacados";


    const descripcion = document.createElement("p");

    descripcion.classList.add("text-muted");

    descripcion.textContent =
        "Productos cargados dinámicamente mediante Fetch API.";


    encabezado.appendChild(titulo);

    encabezado.appendChild(descripcion);

    seccion.appendChild(encabezado);


    const fila = document.createElement("div");

    fila.classList.add(
        "row",
        "g-4"
    );


    productos.forEach(function (producto) {

        const columna = document.createElement("div");

        columna.classList.add(
            "col-12",
            "col-md-6",
            "col-lg-4"
        );


        const tarjeta = document.createElement("article");

        tarjeta.classList.add(
            "card",
            "h-100"
        );


        // Imagen cargada dinámicamente desde el JSON
        const imagen = document.createElement("img");

        imagen.src = producto.imagen;

        imagen.alt = producto.nombre;

        imagen.classList.add(
            "card-img-top",
            "producto-img"
        );


        const cuerpo = document.createElement("div");

        cuerpo.classList.add(
            "card-body",
            "d-flex",
            "flex-column"
        );


        const nombre = document.createElement("h3");

        nombre.classList.add(
            "card-title",
            "h5"
        );

        nombre.textContent = producto.nombre;


        const categoria = document.createElement("p");

        categoria.classList.add("text-muted");

        categoria.textContent =
            "Categoría: " + producto.categoria;


        const descripcionProducto =
            document.createElement("p");

        descripcionProducto.classList.add("card-text");

        descripcionProducto.textContent =
            producto.descripcion;


        const precio = document.createElement("p");

        precio.classList.add(
            "fw-bold",
            "mt-auto"
        );

        precio.textContent =
            "Precio: $" +
            producto.precio.toLocaleString("es-CL");


        cuerpo.appendChild(nombre);

        cuerpo.appendChild(categoria);

        cuerpo.appendChild(descripcionProducto);

        cuerpo.appendChild(precio);


        tarjeta.appendChild(imagen);

        tarjeta.appendChild(cuerpo);

        columna.appendChild(tarjeta);

        fila.appendChild(columna);

    });


    seccion.appendChild(fila);


    const seccionNosotros =
        document.querySelector("#nosotros");

    main.insertBefore(
        seccion,
        seccionNosotros
    );

}


// -----------------------------------------------------
// FUNCIÓN: mostrarErrorCarga
// Muestra en pantalla un mensaje si Fetch API falla.
// -----------------------------------------------------

function mostrarErrorCarga(error) {

    const main = document.querySelector("main");

    const mensajeError = document.createElement("div");

    mensajeError.classList.add(
        "container",
        "alert",
        "alert-danger",
        "text-center",
        "my-4"
    );


    mensajeError.textContent =
        "Error al cargar los productos destacados: " +
        error.message;


    main.appendChild(mensajeError);


    console.error(error);

}


// -----------------------------------------------------
// EJECUCIÓN INICIAL
// -----------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    crearOfertaDelDia();

    configurarEventosTarjetas();

    configurarFormularioContacto();

    cargarProductosDestacados();

});