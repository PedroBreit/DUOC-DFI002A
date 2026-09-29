function CartModal({
  carrito,
  onEliminar,
  onVaciar,
  onAumentar,
  onDisminuir,
}) {
  const total = carrito.reduce(
    (acumulador, producto) =>
      acumulador +
      producto.precioOferta * producto.cantidad,
    0,
  )

  const cantidadTotal = carrito.reduce(
    (acumulador, producto) =>
      acumulador + producto.cantidad,
    0,
  )

  return (
    <div
      className="modal fade"
      id="modalCarrito"
      tabIndex="-1"
      aria-labelledby="tituloModalCarrito"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content modal-carrito">

          <div className="modal-header">
            <h2
              className="modal-title"
              id="tituloModalCarrito"
            >
              MI CARRITO
            </h2>

            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            />
          </div>

          <div className="modal-body">

            {carrito.length === 0 ? (
              <p className="carrito-vacio text-center mb-0">
                Tu carrito está vacío.
              </p>
            ) : (
              <>
                <p className="resumen-cantidad-carrito">
                  Productos en el carrito:{' '}
                  <strong>{cantidadTotal}</strong>
                </p>

                {carrito.map((producto) => (
                  <div
                    className="item-carrito"
                    key={producto.id}
                  >
                    <div className="info-item-carrito">

                      <strong className="nombre-item-carrito">
                        {producto.nombre}
                      </strong>

                      <p className="precio-carrito-normal mb-0">
                        Precio normal: $
                        {producto.precio.toLocaleString(
                          'es-CL',
                        )}
                      </p>

                      <p className="precio-carrito-oferta mb-2">
                        Oferta: $
                        {producto.precioOferta.toLocaleString(
                          'es-CL',
                        )}
                      </p>

                      <div className="control-cantidad">
                        <span>Cantidad:</span>

                        <button
                          type="button"
                          className="btn-cantidad"
                          onClick={() =>
                            onDisminuir(producto.id)
                          }
                          aria-label={`Disminuir cantidad de ${producto.nombre}`}
                        >
                          −
                        </button>

                        <strong className="cantidad-producto">
                          {producto.cantidad}
                        </strong>

                        <button
                          type="button"
                          className="btn-cantidad"
                          onClick={() =>
                            onAumentar(producto.id)
                          }
                          aria-label={`Aumentar cantidad de ${producto.nombre}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="acciones-item-carrito">

                      <span className="subtotal-carrito">
                        Subtotal: $
                        {(
                          producto.precioOferta *
                          producto.cantidad
                        ).toLocaleString('es-CL')}
                      </span>

                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          onEliminar(producto.id)
                        }
                      >
                        Eliminar
                      </button>

                    </div>
                  </div>
                ))}
              </>
            )}

            <div className="carrito-total mt-4">
              <span>Total:</span>

              <strong>
                ${total.toLocaleString('es-CL')}
              </strong>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-vaciar-carrito"
              onClick={onVaciar}
              disabled={carrito.length === 0}
            >
              Vaciar carrito
            </button>

            <button
              type="button"
              className="btn btn-cerrar-carrito"
              data-bs-dismiss="modal"
            >
              Seguir comprando
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CartModal
