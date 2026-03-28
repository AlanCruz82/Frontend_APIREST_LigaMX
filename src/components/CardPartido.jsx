export function CardPartido({ partido, eliminar }) {
  return (
    <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-4 mt-5">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-3 border-b pb-2">
        <span className="text-sm font-medium text-gray-500">
          Jornada {partido.jornada}
        </span>
        <span className="text-sm text-gray-400">
          {partido.fechaHoraInicio.split("T").join(" ")}
        </span>
      </div>

      {/* Cuerpo */}
      <div className="flex items-center justify-between">
        {/* Equipo local */}
        <div className="text-center flex-1">
          <p className="font-semibold text-gray-800">
            {partido.detallesPartido[0].equipo.nombre}
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {partido.detallesPartido[0].goles}
          </p>
          <p className="text-xs text-gray-500">
            {partido.detallesPartido[0].rolEquipo}
          </p>
        </div>

        {/* Marcador */}
        <div className="px-4 text-xl font-bold text-gray-700">
          {partido.detallesPartido[0].goles} -{" "}
          {partido.detallesPartido[1].goles}
        </div>

        {/* Equipo visitante */}
        <div className="text-center flex-1">
          <p className="font-semibold text-gray-800">
            {partido.detallesPartido[1].equipo.nombre}
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {partido.detallesPartido[1].goles}
          </p>
          <p className="text-xs text-gray-500">
            {partido.detallesPartido[1].rolEquipo}
          </p>
        </div>
      </div>

      {/* Botón eliminar */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => eliminar(partido.id)}
          className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}