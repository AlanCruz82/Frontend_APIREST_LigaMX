import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { obtenerEquipos } from "../../api/equiposApi";
import { obtenerTorneos } from "../../api/torneosApi";
import { partidosEquipoTorneo } from "../../api/partidosApi";
import { CardPartido } from "../../components/CardPartido";
import { Link } from "react-router-dom";

export function PartidosPage(){
    //Estado para almacenar los partidos del equipo seleccionado
    const [ partidos, setPartidos ] = useState([]);
    //Estado para almacenar los torneos que vamos a mostrar en el select
    const [ torneos, setTorneos ] = useState([]);
    //Estado para almacenar los equipos que vamos a mostrar el select
    const [ equipos, setEquipos ] = useState([]);
    //Estado para almacenar el equipo elegido del select
    const [ equipo, setEquipo ] = useState("");
    //Estado para almacenar el torneo elegido del select
    const [ torneo, setTorneo ] = useState("");
    
    //Llamada al servicio apiFetch para obtener los equipos y torneos que vamos a ocupar
    useEffect(()=>{
        obtenerEquipos().then(
            setEquipos
        ).catch(error => console.error(error));

        obtenerTorneos().then(
            setTorneos
        ).catch(error => console.error(error));
    },[]);

    //Si se presiona la busqueda de partidos por torneo y equipo
    const busquedaPartidos = (idEquipo,idTorneo) => {
        //Hacemos la llamada a la api rest para obtener los partidos del equipo en el torneo seleccionado
        partidosEquipoTorneo(idEquipo,idTorneo).then(
          //Establecemos los partidos obtenidos en nuestro estado partidos
          setPartidos
        ).catch(error => console.error(error));
    };

    return (
      <>
        <NavBar />
        <h1 className="mt-20 text-2xl font-bold">Partidos</h1>

        <div className="grid gap-6 mb-6 md:grid-cols-3 items-end">
          <div>
            <label
              htmlFor="selector-equipo"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Elige un equipo
            </label>
            <select
              id="selector-equipo"
              className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              value={equipo}
              onChange={(e) => setEquipo(e.target.value)}
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
            <label
              htmlFor="selector-torneo"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Elige un torneo
            </label>
            <select
              id="selector-torneo"
              value={torneo}
              className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              onChange={(e) => setTorneo(e.target.value)}
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

          <div className="flex">
            <button
              className="w-full text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none transition-all"
              onClick={() => busquedaPartidos(equipo, torneo)}
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Validamos si nuestra lista de partidos tiene partidos para mostrar, en caso de no tener mostramos
        una mensaje informativo, caso contrario mostramos los partidos del equipo y torneo seleccionado */}
        {partidos.length === 0 ? (
          <p>Sin partidos para mostrar</p>
        ) : (
          partidos.map((partido) => (
            <CardPartido partido={partido} key={partido.id} />
          ))
        )}

        <section className="mt-6">
          <label className="block mb-2 font-medium">Agregar partido</label>
          <div>
            <button className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">
              <Link to="/agregarPartido" className="flex items-center gap-2">
                Agregar
              </Link>
            </button>
          </div>
        </section>
      </>
    );
}