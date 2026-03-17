export function CardPartido({partido}){
    return (
      <div className="tarjeta-partido">
        <div className="encabezado-partido">
          <span className="jornada-partido">Jornada {partido.jornada}</span>
          <br />
          <span className="fecha-hora-partido">{(partido.fechaHoraInicio).split("T").join(" ")}</span>
        </div>

        <div className="cuerpo-partido">
          <div className="detalle-equipo-local">
            <span className="equipo-local">
              {partido.detallesPartido[0].equipo.nombre}
            </span>
            <br />
            <span className="goles-local">
              {partido.detallesPartido[0].goles}
            </span>
            <br />
            <span className="rol-local">
              {partido.detallesPartido[0].rolEquipo}
            </span>
          </div>

          <div className="marcador-partido">
            {partido.detallesPartido[0].goles} -{" "}
            {partido.detallesPartido[1].goles}
          </div>

          <div className="detalle-equipo-visitante">
            <span className="equipo-visitante">
              {partido.detallesPartido[1].equipo.nombre}
            </span>
            <br />
            <span className="goles-local">
              {partido.detallesPartido[1].goles}
            </span>
            <br />
            <span className="rol-local">
              {partido.detallesPartido[1].rolEquipo}
            </span>
            <br />
          </div>
        </div>
      </div>
    );
}