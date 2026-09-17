/* =========================================
   Pixel Store
   Productos dinámicos con Fetch API
   ========================================= */

let productosDisponibles = [];
let categoriaActual = "Todos";
let terminoBusqueda = "";
let carrito = [];

/* =========================================
   Inicio de la aplicación
   ========================================= */

document.addEventListener("DOMContentLoaded", iniciarAplicacion);

async function iniciarAplicacion() {
    configurarFiltrosCategorias();
    configurarFormularioBusqueda();
    configurarEventosProductos();
    configurarBotonVaciarCarrito();

    await cargarProductos();

    actualizarCarrito();
}

/* =========================================
   Cargar productos desde JSON
   ========================================= */

async function cargarProductos() {
    const catalogo = document.getElementById("lista-productos");
    const destacados = document.getElementById("productos-destacados");

    if (!catalogo && !destacados) {
        return;
    }

    try {
        const respuesta = await fetch("assets/data/productos.json");

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        if (!Array.isArray(productos) || productos.length === 0) {
            throw new Error("No existen productos disponibles.");
        }

        productosDisponibles = productos;

        if (catalogo) {
            aplicarCategoriaDesdeURL();
        }

        if (destacados) {
            mostrarProductosDestacados(productosDisponibles);
        }
    } catch (error) {
        console.error("Error al cargar los productos:", error);

        if (catalogo) {
            mostrarErrorCarga();
        }

        if (destacados) {
            mostrarErrorDestacados();
        }
    }
}

/* =========================================
   Mostrar productos destacados
   ========================================= */

function mostrarProductosDestacados(productos) {
    const contenedor = document.getElementById("productos-destacados");

    if (!contenedor) {
        return;
    }

    const destacados = productos.slice(0, 3);

    contenedor.innerHTML = "";

    destacados.forEach((producto, indice) => {
        contenedor.innerHTML += crearTarjetaDestacada(producto, indice);
    });
}

/* =========================================
   Crear tarjeta destacada
   ========================================= */

function crearTarjetaDestacada(producto, indice) {
    const colores = [
        "tarjeta-morada",
        "tarjeta-verde",
        "tarjeta-roja"
    ];

    const colorTarjeta = colores[indice % colores.length];

    return `
        <div class="col-12 col-md-6 col-lg-4">
            <article class="card tarjeta-producto ${colorTarjeta} h-100">
                <img
                    src="${producto.imagen}"
                    class="card-img-top"
                    alt="Portada del videojuego ${producto.nombre}"
                    loading="lazy">

                <div class="card-body d-flex flex-column">
                    <h3 class="card-title">
                        ${producto.nombre}
                    </h3>

                    <p class="card-text">
                        ${producto.descripcion}
                    </p>

                    <p class="text-warning fw-bold mt-auto mb-3">
                        ${formatearPrecio(producto.precio)}
                    </p>

                    <a
                        href="productos.html"
                        class="btn btn-agregar-carrito">
                        Ver productos
                    </a>
                </div>
            </article>
        </div>
    `;
}

/* =========================================
   Mostrar catálogo de productos
   ========================================= */

function mostrarProductos(productos) {
    const contenedor = document.getElementById("lista-productos");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center mb-0" role="alert">
                    No se encontraron productos que coincidan con la búsqueda.
                </div>
            </div>
        `;

        return;
    }

    productos.forEach((producto, indice) => {
        contenedor.innerHTML += crearTarjetaProducto(producto, indice);
    });
}

/* =========================================
   Crear tarjeta de producto
   ========================================= */

function crearTarjetaProducto(producto, indice) {
    const colores = [
        "tarjeta-morada",
        "tarjeta-verde",
        "tarjeta-roja"
    ];

    const colorTarjeta = colores[indice % colores.length];

    return `
        <div class="col-12 col-md-6 col-lg-4">
            <article class="card tarjeta-producto ${colorTarjeta} h-100">
                <img
                    src="${producto.imagen}"
                    class="card-img-top"
                    alt="Portada del videojuego ${producto.nombre}"
                    loading="lazy">

                <div class="card-body d-flex flex-column">
                    <h3 class="card-title">
                        ${producto.nombre}
                    </h3>

                    <p class="card-text">
                        ${producto.descripcion}
                    </p>

                    <p class="mb-2">
                        <strong>Categoría:</strong>
                        ${producto.categoria}
                    </p>

                    <p class="text-warning fw-bold mt-auto mb-0">
                        ${formatearPrecio(producto.precio)}
                    </p>

                    <button
                        class="btn btn-agregar-carrito mt-3"
                        type="button"
                        data-id="${producto.id}">
                        Agregar al carrito
                    </button>
                </div>
            </article>
        </div>
    `;
}

/* =========================================
   Evento click de productos
   ========================================= */

function configurarEventosProductos() {
    const contenedor = document.getElementById("lista-productos");

    if (!contenedor) {
        return;
    }

    contenedor.addEventListener("click", function (evento) {
        const boton = evento.target.closest(".btn-agregar-carrito");

        if (!boton) {
            return;
        }

        const idProducto = Number(boton.dataset.id);

        agregarAlCarrito(idProducto);
    });
}

/* =========================================
   Agregar producto al carrito
   ========================================= */

function agregarAlCarrito(idProducto) {
    const producto = productosDisponibles.find(
        (item) => item.id === idProducto
    );

    if (!producto) {
        return;
    }

    const productoEnCarrito = carrito.find(
        (item) => item.id === idProducto
    );

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    actualizarCarrito();
    mostrarMensajeCarrito(`${producto.nombre} fue agregado al carrito.`);
}

/* =========================================
   Actualizar carrito
   ========================================= */

function actualizarCarrito() {
    const resumen = document.getElementById("resumen-carrito");
    const totalElemento = document.getElementById("total-carrito");
    const contador = document.getElementById("contador-carrito");
    const botonVaciar = document.getElementById("btn-vaciar-carrito");

    if (!resumen || !totalElemento || !contador || !botonVaciar) {
        return;
    }

    const cantidadTotal = carrito.reduce(
        (acumulador, producto) =>
            acumulador + producto.cantidad,
        0
    );

    contador.textContent = cantidadTotal;

    if (carrito.length === 0) {
        resumen.innerHTML = `
            <p class="carrito-vacio text-center mb-0">
                Tu carrito está vacío.
            </p>
        `;

        totalElemento.textContent = "$0";
        botonVaciar.disabled = true;

        return;
    }

    resumen.innerHTML = "";

    carrito.forEach((producto) => {
        const subtotal = producto.precio * producto.cantidad;

        resumen.innerHTML += `
            <div class="item-carrito">
                <div>
                    <strong>
                        ${producto.nombre}
                    </strong>

                    <p class="mb-0">
                        ${formatearPrecio(producto.precio)}
                        x ${producto.cantidad}
                    </p>
                </div>

                <span class="subtotal-carrito">
                    ${formatearPrecio(subtotal)}
                </span>
            </div>
        `;
    });

    const total = carrito.reduce(
        (acumulador, producto) =>
            acumulador + producto.precio * producto.cantidad,
        0
    );

    totalElemento.textContent = formatearPrecio(total);
    botonVaciar.disabled = false;
}

/* =========================================
   Vaciar carrito
   ========================================= */

function configurarBotonVaciarCarrito() {
    const botonVaciar = document.getElementById("btn-vaciar-carrito");

    if (!botonVaciar) {
        return;
    }

    botonVaciar.addEventListener("click", function () {
        carrito = [];

        actualizarCarrito();
        mostrarMensajeCarrito("El carrito fue vaciado.");
    });
}

/* =========================================
   Mensaje del carrito
   ========================================= */

function mostrarMensajeCarrito(mensaje) {
    const elementoMensaje = document.getElementById("mensaje-carrito");

    if (!elementoMensaje) {
        return;
    }

    elementoMensaje.textContent = mensaje;

    setTimeout(() => {
        elementoMensaje.textContent = "";
    }, 2500);
}

/* =========================================
   Formulario de búsqueda
   Evento submit
   ========================================= */

function configurarFormularioBusqueda() {
    const formulario = document.getElementById("form-busqueda");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const inputBusqueda = document.getElementById("input-busqueda");

        terminoBusqueda = inputBusqueda.value.trim();

        aplicarFiltros();
    });
}

/* =========================================
   Filtros de categorías
   ========================================= */

function configurarFiltrosCategorias() {
    const enlacesCategorias = document.querySelectorAll(".filtro-categoria");

    enlacesCategorias.forEach((enlace) => {
        enlace.addEventListener("click", function (evento) {
            evento.preventDefault();

            categoriaActual = this.dataset.categoria;

            actualizarURLCategoria(categoriaActual);
            actualizarTituloProductos();
            aplicarFiltros();

            const seccionProductos = document.getElementById("productos");

            if (seccionProductos) {
                seccionProductos.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
}

/* =========================================
   Aplicar categoría y búsqueda
   ========================================= */

function aplicarFiltros() {
    let productosFiltrados = [...productosDisponibles];

    if (categoriaActual !== "Todos") {
        productosFiltrados = productosFiltrados.filter(
            (producto) => producto.categoria === categoriaActual
        );
    }

    if (terminoBusqueda !== "") {
        const termino = terminoBusqueda.toLowerCase();

        productosFiltrados = productosFiltrados.filter((producto) => {
            const nombre = producto.nombre.toLowerCase();
            const categoria = producto.categoria.toLowerCase();
            const descripcion = producto.descripcion.toLowerCase();

            return (
                nombre.includes(termino) ||
                categoria.includes(termino) ||
                descripcion.includes(termino)
            );
        });
    }

    mostrarProductos(productosFiltrados);
    mostrarResultadoBusqueda(productosFiltrados.length);
}

/* =========================================
   Actualizar título según categoría
   ========================================= */

function actualizarTituloProductos() {
    const titulo = document.getElementById("titulo-productos");

    if (!titulo) {
        return;
    }

    if (categoriaActual === "Todos") {
        titulo.textContent = "TODOS NUESTROS PRODUCTOS";
        return;
    }

    titulo.textContent = categoriaActual.toUpperCase();
}

/* =========================================
   Mostrar información de búsqueda
   ========================================= */

function mostrarResultadoBusqueda(cantidadResultados) {
    const elementoResultado = document.getElementById("resultado-busqueda");

    if (!elementoResultado) {
        return;
    }

    if (terminoBusqueda === "") {
        elementoResultado.textContent = "";
        return;
    }

    if (cantidadResultados === 1) {
        elementoResultado.textContent =
            `Se encontró 1 resultado para "${terminoBusqueda}".`;

        return;
    }

    elementoResultado.textContent =
        `Se encontraron ${cantidadResultados} resultados para "${terminoBusqueda}".`;
}

/* =========================================
   Leer categoría desde URL
   ========================================= */

function aplicarCategoriaDesdeURL() {
    const parametros = new URLSearchParams(window.location.search);
    const categoriaURL = parametros.get("categoria");

    if (!categoriaURL) {
        categoriaActual = "Todos";
        actualizarTituloProductos();
        aplicarFiltros();

        return;
    }

    const categoriaExiste = productosDisponibles.some(
        (producto) => producto.categoria === categoriaURL
    );

    if (categoriaExiste) {
        categoriaActual = categoriaURL;
    } else {
        categoriaActual = "Todos";
    }

    actualizarTituloProductos();
    aplicarFiltros();
}

/* =========================================
   Actualizar categoría en URL
   ========================================= */

function actualizarURLCategoria(categoria) {
    const url = new URL(window.location.href);

    if (categoria === "Todos") {
        url.searchParams.delete("categoria");
    } else {
        url.searchParams.set("categoria", categoria);
    }

    window.history.replaceState({}, "", url);
}

/* =========================================
   Formatear precio
   ========================================= */

function formatearPrecio(precio) {
    return `$${precio.toLocaleString("es-CL")}`;
}

/* =========================================
   Error del catálogo
   ========================================= */

function mostrarErrorCarga() {
    const contenedor = document.getElementById("lista-productos");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger text-center mb-0" role="alert">
                No fue posible cargar los productos.
                Por favor, intenta nuevamente más tarde.
            </div>
        </div>
    `;
}

/* =========================================
   Error de productos destacados
   ========================================= */

function mostrarErrorDestacados() {
    const contenedor = document.getElementById("productos-destacados");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger text-center mb-0" role="alert">
                No fue posible cargar los productos destacados.
                Por favor, intenta nuevamente más tarde.
            </div>
        </div>
    `;
}