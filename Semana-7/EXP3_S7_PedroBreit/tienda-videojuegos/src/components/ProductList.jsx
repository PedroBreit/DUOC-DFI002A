import ProductCard from './ProductCard'

function ProductList({
  productos,
  onAgregar,
}) {
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
      {productos.map((producto, indice) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          indice={indice}
          onAgregar={onAgregar}
        />
      ))}
    </div>
  )
}

export default ProductList
