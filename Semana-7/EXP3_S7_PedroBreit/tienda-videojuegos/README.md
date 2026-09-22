# Pixel Store - React

Proyecto desarrollado para la asignatura **Desarrollo Frontend I - PFY2201**.

Esta versión de Pixel Store corresponde a la Semana 7 y continúa el desarrollo realizado durante las semanas anteriores, migrando la tienda de videojuegos a una aplicación construida con React.

## Descripción

Pixel Store es una tienda ficticia de videojuegos que permite visualizar productos, buscar videojuegos, filtrar por categorías y administrar un carrito de compras.

La aplicación fue desarrollada utilizando componentes funcionales de React, manejo de estado con Hooks y renderizado condicional.

## Funcionalidades

- Página de inicio con productos destacados.
- Catálogo completo de videojuegos.
- Visualización de:
  - nombre del producto;
  - imagen;
  - descripción;
  - categoría;
  - precio normal;
  - precio de oferta.
- Precio normal tachado para destacar las ofertas.
- Búsqueda de productos por nombre.
- Filtro de productos por categoría.
- Carrito de compras.
- Agregar productos al carrito.
- Aumentar y disminuir cantidades.
- Eliminar productos del carrito.
- Vaciar completamente el carrito.
- Contador con la cantidad total de productos.
- Cálculo automático de subtotales.
- Cálculo automático del total del carrito.
- Persistencia del carrito utilizando Local Storage.
- Navegación entre Inicio, Productos, Categorías y Contacto.
- Diseño responsivo utilizando Bootstrap 5.
- Renderizado condicional según el estado de la aplicación.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- React
- React Hooks
- Vite
- Bootstrap 5
- Local Storage
- Git
- GitHub

## Hooks utilizados

### useState

Se utiliza para administrar diferentes estados de la aplicación:

- productos agregados al carrito;
- cantidades;
- búsqueda;
- categoría seleccionada;
- vista actual.

### useEffect

Se utiliza para guardar automáticamente el contenido del carrito en Local Storage cada vez que ocurre un cambio.

Esto permite conservar el carrito incluso después de recargar la página.

## Componentes principales

La aplicación se encuentra dividida en componentes funcionales reutilizables.

```text
src/
│
├── components/
│   ├── CartModal.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Home.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   └── SearchBar.jsx
│
├── data/
│   └── productos.json
│
├── styles/
│   └── styles.css
│
├── App.jsx
└── main.jsx
```

## Datos de productos

Los productos se encuentran almacenados en:

```text
src/data/productos.json
```

Cada producto contiene información como:

```text
id
nombre
precio
precioOferta
categoria
imagen
descripcion
```

## Instalación

Para instalar las dependencias del proyecto:

```bash
npm install
```

## Ejecutar en modo desarrollo

```bash
npm run dev
```

Luego abrir la dirección indicada por Vite, normalmente:

```text
http://localhost:5173/
```

## Validación del código

El proyecto utiliza ESLint para revisar la calidad y sintaxis del código.

```bash
npm run lint
```

## Generar versión de producción

```bash
npm run build
```

Vite genera la versión optimizada de producción dentro de la carpeta:

```text
dist/
```

## Carrito de compras

Cuando un producto se agrega varias veces, no se crean filas duplicadas.

En su lugar, se incrementa su cantidad.

Por ejemplo:

```text
Hollow Knight

Precio normal: $12.990
Oferta: $9.990
Cantidad: 2
Subtotal: $19.980
```

El contador ubicado en la barra de navegación representa la cantidad total de unidades agregadas al carrito.

## Persistencia

El carrito se guarda en el navegador mediante Local Storage.

Por esta razón, los productos y sus cantidades permanecen disponibles después de actualizar la página.

## Repositorio

Repositorio del proyecto:

https://github.com/PedroBreit/DUOC-DFI002A

## Autor

Pedro Breit

Desarrollo Frontend I  
PFY2201
