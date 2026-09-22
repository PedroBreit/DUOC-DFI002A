import ProductList from './ProductList'

function Home({
  productos,
  onAgregar,
  onIrProductos,
  onSeleccionarCategoria,
}) {
  const productosDestacados = productos.slice(0, 3)

  return (
    <main>

      <section
        id="destacados"
        className="seccion productos-destacados"
      >
        <h2>TOP 3 DEL MES</h2>

        <p>
          Conoce algunos de los videojuegos destacados
          disponibles actualmente en nuestra tienda.
        </p>

        <ProductList
          productos={productosDestacados}
          onAgregar={onAgregar}
        />

        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-agregar-carrito"
            onClick={onIrProductos}
          >
            Ver todos los productos
          </button>
        </div>
      </section>

      <section
        id="categorias"
        className="seccion"
      >
        <h2>CATEGORÍAS</h2>

        <p>
          En Pixel Store puedes encontrar videojuegos
          de distintas categorías para todos los gustos.
        </p>

        <ul className="lista-categorias">

          <li>
            <button
              type="button"
              className="categoria-link"
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
              type="button"
              className="categoria-link"
              onClick={() =>
                onSeleccionarCategoria('Carreras')
              }
            >
              Carreras
            </button>
          </li>

          <li>
            <button
              type="button"
              className="categoria-link"
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
              type="button"
              className="categoria-link"
              onClick={() =>
                onSeleccionarCategoria('Arcade')
              }
            >
              Arcade
            </button>
          </li>

          <li>
            <button
              type="button"
              className="categoria-link"
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
      </section>

      <section
        id="contacto"
        className="seccion"
      >
        <h2>CONTACTO</h2>

        <p>
          Si necesitas información sobre nuestros
          productos, puedes comunicarte con nosotros
          mediante los siguientes medios:
        </p>

        <ul>
          <li>
            Correo:{' '}
            <a href="mailto:contacto@pixelstore.cl">
              contacto@pixelstore.cl
            </a>
          </li>

          <li>
            Teléfono: +56 9 1234 5678
          </li>

          <li>
            Dirección: Avenida Gamer 123,
            Santiago, Chile
          </li>
        </ul>
      </section>

    </main>
  )
}

export default Home
