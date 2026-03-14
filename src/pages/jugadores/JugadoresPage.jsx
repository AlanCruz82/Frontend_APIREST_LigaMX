import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { obtenerJugadores } from "../../api/jugadoresApi";
import { obtenerEquipos } from "../../api/equiposApi";
import { Link, useNavigate } from "react-router-dom";
import { eliminarJugador } from "../../api/jugadoresApi";

export function JugadoresPage(){
    //Estado para almacenar los jugadores que vamos a obtener (inicializado como una lista vacia)
    const [ jugadores, setJugadores] = useState([]);
    //Estado para almacenar los equipos disponibles y mostrarlos en el select
    const [ equipos, setEquipos ] = useState([]);
    //Estado para almacenar el id del equipo individual seleccionado
    const [ equipo, setEquipo ] = useState("");

    //Variable para redireccionar la pagina al momento de editar un jugador
    const navigate = useNavigate();

    //Funcion que llamamos en el boton de la tabla para eliminar un jugador con el id enviado
    const eliminar = (id) => {
      //Llamamos al cliente apiFecth para hacer la llamada a la api y eliminar el jugador indicado
      eliminarJugador(id).then(
        //Actualizamos los jugadores para mostrar todos los jugadores excepto el del id indicado
        () => setJugadores(jugadores.filter(j => j.id !== id))
      ).catch(error => console.error(error))
    }

    //Llamada a la api rest para obtener los equipos del select y jugadores de la tabla
    useEffect(()=>{
        obtenerEquipos().then(
           setEquipos
        ).catch(error => console.error(error));
        
        obtenerJugadores(equipo).then(
            setJugadores
        ).catch(error => console.error(error));
    },[equipo]);

    return (
      <>
        <NavBar />
        <h1>Jugadores</h1>

        <label htmlFor="selector-equipo">Elige un equipo</label>
        <select id="selector-equipo" value={equipo} onChange={(e) => setEquipo(e.target.value)}>
          <option value="" disabled>---Elige un equipo---</option>
          {equipos.map((equipo) => (
            <option key={equipo.id} value={equipo.id}>
              {equipo.nombre}
            </option>
          ))}
        </select>

        <table border="3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>APaterno</th>
              <th>AMaterno</th>
              <th>Fecha Nacimiento</th>
              <th>Pais</th>
              <th>Posicion</th>
              <th>Equipo</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {jugadores.map((jugador) => (
              <tr key={jugador.id}>
                <td>{jugador.id}</td>
                <td>{jugador.nombre}</td>
                <td>{jugador.apellidoPaterno}</td>
                <td>{jugador.apellidoMaterno}</td>
                <td>{jugador.fechaNacimiento}</td>
                <td>{jugador.pais}</td>
                <td>{jugador.posicion}</td>
                <td>{jugador.equipo.nombre}</td>
                <td>
                  <Link to={`/jugadores/${jugador.id}`}><button>Editar</button></Link>
                  <button onClick={() => eliminar(jugador.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <section>
                <label>Agregar jugador</label>
                <div>
                    <Link to="/agregarJugador"><button>Agregar</button></Link>
                </div>
            </section>
      </>
    );
}