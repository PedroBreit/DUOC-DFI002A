function ProductCard({
  producto,
  indice,
  onAgregar,
}) {
  const colores = [
    'tarjeta-morada',
    'tarjeta-verde',
    'tarjeta-roja',
  ]

  const colorTarjeta = colores[indice % colores.length]

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
              {producto.precioOferta.toLocaleString('es-CL')}
            </p>

            <button
              type="button"
              className="btn btn-agregar-carrito w-100"
              onClick={() => onAgregar(producto)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export default ProductCard
