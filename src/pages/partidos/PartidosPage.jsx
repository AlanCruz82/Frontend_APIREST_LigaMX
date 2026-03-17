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
        <h1>Partidos</h1>

        <div>
          <label htmlFor="selector-equipo">Elige un equipo</label>
          <select
            id="selector-equipo"
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

          <label htmlFor="selector-torneo">Elige un torneo</label>
          <select
            id="selector-torneo"
            value={torneo}
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

          <button onClick={() => busquedaPartidos(equipo, torneo)}>
            Buscar
          </button>
        </div>
        
        {/* Validamos si nuestra lista de partidos tiene partidos para mostrar, en caso de no tener mostramos
        una mensaje informativo, caso contrario mostramos los partidos del equipo y torneo seleccionado */}
        {partidos.length === 0 ? (
          <p>Sin partidos para mostrar</p>
        ) : partidos.map(partido => (
          <CardPartido partido={partido} key={partido.id}/>
        ))}

        <section>
            <label>Agregar partido</label>
            <div>
              <Link to="/agregarPartido"><button>Agregar</button></Link>
            </div>
        </section>
      </>
    );
}