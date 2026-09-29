function Navbar({
  cantidadCarrito,
  onIrInicio,
  onIrProductos,
  onSeleccionarCategoria,
  onIrContacto,
}) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark pixel-navbar"
      aria-label="Navegación principal"
    >
      <div className="container">

        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarPixelStore"
          aria-controls="navbarPixelStore"
          aria-expanded="false"
          aria-label="Mostrar navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-lg-center"
          id="navbarPixelStore"
        >
          <ul className="navbar-nav align-items-lg-center">

            <li className="nav-item">
              <button
                className="nav-link"
                type="button"
                onClick={onIrInicio}
              >
                Inicio
              </button>
            </li>

            <li className="nav-item">
              <button
                className="nav-link"
                type="button"
                onClick={onIrProductos}
              >
                Productos
              </button>
            </li>

            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categorías
              </button>

              <ul className="dropdown-menu">

                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      onSeleccionarCategoria('Todos')
                    }
                  >
                    Todos
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      onSeleccionarCategoria(
                        'Acción y aventura',
                      )
                    }
                  >
                    Acción y aventura
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      onSeleccionarCategoria('Carreras')
                    }
                  >
                    Carreras
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      onSeleccionarCategoria(
                        'Construcción',
                      )
                    }
                  >
                    Construcción
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      onSeleccionarCategoria('Arcade')
                    }
                  >
                    Arcade
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      onSeleccionarCategoria(
                        'Plataformas',
                      )
                    }
                  >
                    Plataformas
                  </button>
                </li>

              </ul>
            </li>

            <li className="nav-item">
              <button
                className="nav-link boton-carrito-nav"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalCarrito"
              >
                <span>Carrito</span>

                <span className="contador-carrito">
                  {cantidadCarrito}
                </span>
              </button>
            </li>

            <li className="nav-item">
              <button
                className="nav-link"
                type="button"
                onClick={onIrContacto}
              >
                Contacto
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
