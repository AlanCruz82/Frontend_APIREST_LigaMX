import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerEquipos } from "../../api/equiposApi";
import { obtenerTorneos } from "../../api/torneosApi";
import { crearPartido } from "../../api/partidosApi";

export function AgregarPartidoPage(){
    //Estado para almacenar el partido que vamos a registrar
    const [ partido, setPartido ] = useState({
        jornada : 0,
        fechaHoraInicio: "",
        fechaHoraFin: "",
        idTorneo: "",
        detallesPartido: [],
    });
    
    //Estados para almacenar los equipos y torneos que vamos a mostrar en el select del formulario
    const [ equipos, setEquipos ] = useState([]);
    const [ torneos, setTorneos ] = useState([]);

    //Estados para almacenar la informacion de los equipos del partido (Local/Visitante)
    const [ equipoLocal, setEquipoLocal ] = useState({
      idEquipo: "",
      rolEquipo: "",
      goles: 0,
    });
    const [ equipoVisitante, setEquipoVisitante ] = useState({
      idEquipo: "",
      rolEquipo: "",
      goles: 0,
    });

    //Funcion para redirigir la pagina al registrar un nuevo equipo
    const navigate = useNavigate();

    //Llamadas a la api para obtener los equipos y torneos que vamos a utilizar y mostrar
    useEffect(() => {
      obtenerEquipos()
        .then(setEquipos)
        .catch((error) => console.error(error));

      obtenerTorneos()
        .then(setTorneos)
        .catch((error) => console.error(error));
    }, []);

    //Funcion que se va a ocupar al envia el formulario
    const registrar = (evento) => {
        //Evitamos que se recargue la pagina al enviar el formulario
        evento.preventDefault();

        //Generamos el partido incluyendo la informacion de los equipos (Local,Visitante)
        const partidoCompleto = {
          ...partido,
          detallesPartido : [equipoLocal,equipoVisitante],
        }

        console.log(partidoCompleto);
        
        //Hacemos la llamada a la api para registrar el nuevo partido
        crearPartido(partidoCompleto).then(
          //SI se registro el partido, redirigimos la pagina principal de partidos
          navigate("/partidos")
        ).catch(error => console.error(error))
    };

    //Funcion para establecer el cambio de estado de los inputs
    const establecerCambio = (evento) => {
      //Obtenemos el nombre y el valor del input
      const { name, value } = evento.target;

      //Establecemos el nuevo valor de la propiedad con el nombre del input del partido que tenemos como estado
      setPartido({
        ...partido, //Copiamos las demas propiedades y su valor que tenia el partido
        [name] : value, //Establecemos el nuevo valor para la propiedad con el nombre del input
      })
    };

    return (
        <form onSubmit={registrar} className="max-w-sm mx-auto">
          <h1>Registrar partido</h1>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="jornada" className="block mb-2.5 text-sm font-medium text-heading">Jornada</label>
              <input
                type="number"
                name="jornada"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                value={partido.jornada}
                onChange={establecerCambio}
              />
            </div>

            <div>
              <label htmlFor="selector-torneo" className="block mb-2.5 text-sm font-medium text-heading">Elige un torneo</label>
              <select
                id="selector-torneo"
                className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                value={partido.idTorneo}
                name="idTorneo"
                onChange={establecerCambio}
              >
                <option value="" disabled>
                  ---Elige un torneo---
                </option>
                {torneos.map((torneo) => (
                  <option key={torneo.id} value={torneo.id}>
                    {torneo.nombre} {torneo.anio}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="fechaHoraInicio" className="block mb-2.5 text-sm font-medium text-heading">Fecha y hora de inicio</label>
              <input
                type="datetime-local"
                name="fechaHoraInicio"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                value={partido.fechaHoraInicio}
                onChange={establecerCambio}
              />
            </div>

            <div>
              <label htmlFor="fechaHoraFin" className="block mb-2.5 text-sm font-medium text-heading">Fecha y hora de fin</label>
              <input
                type="datetime-local"
                name="fechaHoraFin"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                value={partido.fechaHoraFin}
                onChange={establecerCambio}
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="equipo-local" className="block mb-2.5 mt-3 text-sm font-medium text-heading">EQUIPO LOCAL</label>
            </div>
            
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="selector-equipo" className="block mb-2.5 text-sm font-medium text-heading">Elige al equipo</label>
                <select
                  id="selector-equipo"
                  className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                  value={equipoLocal.idEquipo}
                  onChange={(e) => setEquipoLocal({
                    ...equipoLocal,
                    idEquipo: e.target.value,
                    rolEquipo: "LOCAL",
                  })}
                >
                  <option value="" disabled>
                    ---Elige un equipo---
                  </option>
                  {equipos.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>
                      {equipo.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="goles" className="block mb-2.5 text-sm font-medium text-heading">Goles</label>
                <input
                  type="number"
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  value={equipoLocal.goles}
                  onChange={e => setEquipoLocal({
                    ...equipoLocal,
                    goles: e.target.value,
                  })}/>
              </div>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="equipo-equipo-visitante" className="block mb-2.5 mt-3 text-sm font-medium text-heading">EQUIPO VISITANTE</label>
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="selector-equipo" className="block mb-2.5 text-sm font-medium text-heading">Elige al equipo</label>
                  <select
                    id="selector-equipo"
                    className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                    value={equipoVisitante.idEquipo}
                    onChange={(e) => setEquipoVisitante({
                      ...equipoVisitante,
                      idEquipo: e.target.value,
                      rolEquipo : "VISITANTE",
                    })}
                  >
                    <option value="" disabled>
                      ---Elige un equipo---
                    </option>
                    {equipos.map((equipo) => (
                      <option key={equipo.id} value={equipo.id}>
                        {equipo.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="goles" className="block mb-2.5 text-sm font-medium text-heading">Goles</label>
                  <input
                    type="number"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    value={equipoVisitante.goles}
                    onChange={e => setEquipoVisitante({
                      ...equipoVisitante,
                      goles: e.target.value,
                    })}/>
                </div>
              </div>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Agregar</button>
            <Link to="/partidos">
            <button type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
            Regresar
            </button>
          </Link>
          </div>
        </form>
    );

}