import { useEffect, useState } from 'react'

import Header from './components/Header'
import Navbar from './components/Navbar'
import Home from './components/Home'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import CartModal from './components/CartModal'
import Footer from './components/Footer'

import productos from './data/productos.json'

function App() {
  // Recupera el carrito guardado al iniciar la aplicación
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado =
        localStorage.getItem('pixelStoreCarrito')

      return carritoGuardado
        ? JSON.parse(carritoGuardado)
        : []
    } catch {
      return []
    }
  })

  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todos')
  const [vista, setVista] = useState('inicio')

  // Guarda automáticamente el carrito cuando cambia
  useEffect(() => {
    localStorage.setItem(
      'pixelStoreCarrito',
      JSON.stringify(carrito),
    )
  }, [carrito])

  // Agrega un producto nuevo o aumenta su cantidad
  function agregarAlCarrito(producto) {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id,
      )

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item,
        )
      }

      return [
        ...carritoActual,
        {
          ...producto,
          cantidad: 1,
        },
      ]
    })
  }

  // Aumenta la cantidad de un producto
  function aumentarCantidad(id) {
    setCarrito((carritoActual) =>
      carritoActual.map((producto) =>
        producto.id === id
          ? {
              ...producto,
              cantidad: producto.cantidad + 1,
            }
          : producto,
      ),
    )
  }

  // Disminuye una unidad
  // Si llega a 0, elimina el producto
  function disminuirCantidad(id) {
    setCarrito((carritoActual) =>
      carritoActual
        .map((producto) =>
          producto.id === id
            ? {
                ...producto,
                cantidad: producto.cantidad - 1,
              }
            : producto,
        )
        .filter((producto) => producto.cantidad > 0),
    )
  }

  // Elimina completamente un producto
  function eliminarDelCarrito(id) {
    setCarrito((carritoActual) =>
      carritoActual.filter(
        (producto) => producto.id !== id,
      ),
    )
  }

  // Vacía completamente el carrito
  function vaciarCarrito() {
    setCarrito([])
  }

  // Actualiza la búsqueda
  function cambiarBusqueda(evento) {
    setBusqueda(evento.target.value)
  }

  // Muestra la página de inicio
  function irAInicio() {
    setVista('inicio')
    setCategoria('Todos')
    setBusqueda('')

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, 0)
  }

  // Muestra todos los productos
  function irAProductos() {
    setVista('productos')
    setCategoria('Todos')
    setBusqueda('')

    setTimeout(() => {
      document
        .getElementById('productos')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    }, 0)
  }

  // Filtra los productos según la categoría
  function seleccionarCategoria(nuevaCategoria) {
    setVista('productos')
    setCategoria(nuevaCategoria)
    setBusqueda('')

    setTimeout(() => {
      document
        .getElementById('productos')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    }, 0)
  }

  // Regresa al inicio y baja hasta contacto
  function irAContacto() {
    setVista('inicio')

    setTimeout(() => {
      document
        .getElementById('contacto')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    }, 0)
  }

  // Filtrado por nombre y categoría
  const productosFiltrados = productos.filter(
    (producto) => {
      const coincideBusqueda = producto.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase())

      const coincideCategoria =
        categoria === 'Todos' ||
        producto.categoria === categoria

      return coincideBusqueda && coincideCategoria
    },
  )

  // Calcula la cantidad total de unidades en el carrito
  const cantidadTotalCarrito = carrito.reduce(
    (total, producto) =>
      total + producto.cantidad,
    0,
  )

  return (
    <>
      <Header />

      <Navbar
        cantidadCarrito={cantidadTotalCarrito}
        onIrInicio={irAInicio}
        onIrProductos={irAProductos}
        onSeleccionarCategoria={
          seleccionarCategoria
        }
        onIrContacto={irAContacto}
      />

      {vista === 'inicio' ? (
        <Home
          productos={productos}
          onAgregar={agregarAlCarrito}
          onIrProductos={irAProductos}
          onSeleccionarCategoria={
            seleccionarCategoria
          }
        />
      ) : (
        <main>
          <section
            id="productos"
            className="seccion"
          >
            <h2>
              {categoria === 'Todos'
                ? 'TODOS NUESTROS PRODUCTOS'
                : `PRODUCTOS: ${categoria.toUpperCase()}`}
            </h2>

            <p>
              Explora nuestro catálogo de videojuegos
              disponibles para diferentes plataformas y
              géneros.
            </p>

            <SearchBar
              busqueda={busqueda}
              onCambiarBusqueda={cambiarBusqueda}
            />

            <ProductList
              productos={productosFiltrados}
              onAgregar={agregarAlCarrito}
            />
          </section>
        </main>
      )}

      <Footer />

      <CartModal
        carrito={carrito}
        onEliminar={eliminarDelCarrito}
        onVaciar={vaciarCarrito}
        onAumentar={aumentarCantidad}
        onDisminuir={disminuirCantidad}
      />
    </>
  )
}

export default App
