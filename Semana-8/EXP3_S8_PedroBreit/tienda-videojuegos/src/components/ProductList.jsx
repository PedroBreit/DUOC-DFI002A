import ProductCard from './ProductCard'

function ProductList({
  productos,
  carrito,
  onAgregar,
  onAumentar,
  onDisminuir,
}) {
  // Renderizado condicional cuando no hay resultados
  if (productos.length === 0) {
    return (
      <div
        className="alert alert-warning text-center"
        role="alert"
      >
        No se encontraron productos que coincidan
        con la búsqueda.
      </div>
    )
  }

  return (
    <div className="row g-4">
      {productos.map((producto, indice) => {
        // Busca si el producto ya se encuentra en el carrito
        const productoEnCarrito = carrito.find(
          (item) => item.id === producto.id,
        )

        // Si no está agregado, su cantidad es 0
        const cantidadEnCarrito =
          productoEnCarrito?.cantidad ?? 0

        return (
          <ProductCard
            key={producto.id}
            producto={producto}
            indice={indice}
            onAgregar={onAgregar}
            onAumentar={onAumentar}
            onDisminuir={onDisminuir}
            cantidadEnCarrito={cantidadEnCarrito}
          />
        )
      })}
    </div>
  )
}

export default ProductList