function ProductCard({
  producto,
  indice,
  onAgregar,
  onAumentar,
  onDisminuir,
  cantidadEnCarrito,
}) {
  const colores = [
    'tarjeta-morada',
    'tarjeta-verde',
    'tarjeta-roja',
  ]

  const colorTarjeta =
    colores[indice % colores.length]

  const rutaImagen =
    `${import.meta.env.BASE_URL}${producto.imagen}`

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <article
        className={`card tarjeta-producto ${colorTarjeta} h-100`}
      >
        <img
          src={rutaImagen}
          className="card-img-top"
          alt={`Portada del videojuego ${producto.nombre}`}
          loading="lazy"
        />

        <div className="card-body d-flex flex-column">
          <h3 className="card-title">
            {producto.nombre}
          </h3>

          <p className="card-text">
            {producto.descripcion}
          </p>

          <p className="mb-3">
            <strong>Categoría:</strong>{' '}
            {producto.categoria}
          </p>

          <div className="mt-auto">
            <p className="precio-normal mb-1">
              Precio normal: $
              {producto.precio.toLocaleString('es-CL')}
            </p>

            <p className="precio-oferta mb-3">
              Oferta: $
              {producto.precioOferta.toLocaleString(
                'es-CL',
              )}
            </p>

            {cantidadEnCarrito === 0 ? (
              <button
                type="button"
                className="btn btn-agregar-carrito w-100"
                onClick={() => onAgregar(producto)}
              >
                Agregar al carrito
              </button>
            ) : (
              <div
                className="
                  d-flex
                  align-items-center
                  justify-content-center
                  gap-3
                "
              >
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() =>
                    onDisminuir(producto.id)
                  }
                  aria-label={`Disminuir cantidad de ${producto.nombre}`}
                >
                  −
                </button>

                <strong
                  className="fs-5"
                  aria-label={`Cantidad en carrito: ${cantidadEnCarrito}`}
                >
                  {cantidadEnCarrito}
                </strong>

                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() =>
                    onAumentar(producto.id)
                  }
                  aria-label={`Aumentar cantidad de ${producto.nombre}`}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default ProductCard