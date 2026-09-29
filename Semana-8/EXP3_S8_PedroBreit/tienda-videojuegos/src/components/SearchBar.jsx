function SearchBar({
  busqueda,
  onCambiarBusqueda,
}) {
  function manejarEnvio(evento) {
    evento.preventDefault()
  }

  return (
    <form
      id="form-busqueda"
      className="mb-4"
      onSubmit={manejarEnvio}
    >
      <div className="input-group">
        <input
          type="search"
          className="form-control"
          placeholder="Buscar videojuego..."
          aria-label="Buscar videojuego"
          value={busqueda}
          onChange={onCambiarBusqueda}
        />

        <button
          className="btn btn-warning fw-bold"
          type="submit"
        >
          Buscar
        </button>
      </div>
    </form>
  )
}

export default SearchBar
