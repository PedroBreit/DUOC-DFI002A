import { useEffect, useState } from 'react'

import Header from './components/Header'
import Navbar from './components/Navbar'
import Home from './components/Home'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import CartModal from './components/CartModal'
import Footer from './components/Footer'

function App() {
  // Estado del catálogo cargado dinámicamente desde productos.json
  const [productos, setProductos] = useState([])
  const [cargandoProductos, setCargandoProductos] =
    useState(true)
  const [errorProductos, setErrorProductos] =
    useState('')

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

  // Estados de elementos interactivos
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todos')
  const [vista, setVista] = useState('inicio')

  // Carga dinámicamente los productos desde un archivo JSON local
  useEffect(() => {
    async function cargarProductos() {
      try {
        setCargandoProductos(true)
        setErrorProductos('')

        const respuesta = await fetch(
          `${import.meta.env.BASE_URL}data/productos.json`,
        )

        if (!respuesta.ok) {
          throw new Error(
            'No fue posible cargar los productos',
          )
        }

        const datos = await respuesta.json()

        setProductos(datos)
      } catch (error) {
        console.error(
          'Error al cargar el catálogo:',
          error,
        )

        setErrorProductos(
          'No fue posible cargar el catálogo de productos.',
        )
      } finally {
        setCargandoProductos(false)
      }
    }

    cargarProductos()
  }, [])

  // Guarda automáticamente el carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem(
      'pixelStoreCarrito',
      JSON.stringify(carrito),
    )
  }, [carrito])

  // Agrega un producto nuevo al carrito
  // o aumenta su cantidad si ya existe
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

  // Disminuye la cantidad.
  // Cuando llega a 0, elimina el producto del carrito.
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

  // Elimina completamente un producto del carrito
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

  // Actualiza el texto ingresado en la búsqueda
  function cambiarBusqueda(evento) {
    setBusqueda(evento.target.value)
  }

  // Regresa a la página de inicio
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

  // Muestra el catálogo completo
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

  // Muestra los productos de una categoría
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

  // Regresa al inicio y desplaza la página hasta contacto
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

  // Filtra el catálogo por nombre y categoría
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

  // Calcula el total de unidades existentes en el carrito
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

      {cargandoProductos ? (
        <main>
          <section className="seccion">
            <div
              className="alert alert-info text-center"
              role="status"
            >
              Cargando catálogo de productos...
            </div>
          </section>
        </main>
      ) : errorProductos ? (
        <main>
          <section className="seccion">
            <div
              className="alert alert-danger text-center"
              role="alert"
            >
              {errorProductos}
            </div>
          </section>
        </main>
      ) : vista === 'inicio' ? (
        <Home
          productos={productos}
          carrito={carrito}
          onAgregar={agregarAlCarrito}
          onAumentar={aumentarCantidad}
          onDisminuir={disminuirCantidad}
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
              carrito={carrito}
              onAgregar={agregarAlCarrito}
              onAumentar={aumentarCantidad}
              onDisminuir={disminuirCantidad}
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