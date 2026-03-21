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
        <h1 className="mt-20 text-2xl font-bold">Jugadores</h1>

        <label
          htmlFor="selector-equipo"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Elige un equipo
        </label>
        <select
          id="selector-equipo"
          value={equipo}
          onChange={(e) => setEquipo(e.target.value)}
          className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
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

        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          {/* Validamos si nuestra lista de jugadores tiene elementos para en que caso de no tener mostrar un mensaje informativo */}
          {jugadores.length === 0 ? <p>Sin jugadores para mostrar</p> :
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">ID</th>
                <th scope="col" className="px-6 py-3 font-medium">Nombre</th>
                <th scope="col" className="px-6 py-3 font-medium">APaterno</th>
                <th scope="col" className="px-6 py-3 font-medium">AMaterno</th>
                <th scope="col" className="px-6 py-3 font-medium">Fecha Nacimiento</th>
                <th scope="col" className="px-6 py-3 font-medium">Pais</th>
                <th scope="col" className="px-6 py-3 font-medium">Posicion</th>
                <th scope="col" className="px-6 py-3 font-medium">Equipo</th>
                <th scope="col" className="px-6 py-3 font-medium">Accion</th>
              </tr>
            </thead>
            <tbody>
              {jugadores.map((jugador) => (
                <tr key={jugador.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                  <td className="px-6 py-4">{jugador.id}</td>
                  <td className="px-6 py-4">{jugador.nombre}</td>
                  <td className="px-6 py-4">{jugador.apellidoPaterno}</td>
                  <td className="px-6 py-4">{jugador.apellidoMaterno}</td>
                  <td className="px-6 py-4">{jugador.fechaNacimiento}</td>
                  <td className="px-6 py-4">{jugador.pais}</td>
                  <td className="px-6 py-4">{jugador.posicion}</td>
                  <td className="px-6 py-4">{jugador.equipo.nombre}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link to={`/jugadores/${jugador.id}`}>
                      <button className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
                      >
                        Editar
                      </button>
                    </Link>
                    <button onClick={() => eliminar(jugador.id)}
                    className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>

        <section className="mt-6">
          <label className="block mb-2 font-medium">Agregar jugador</label>
          <div>
            <button className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">
              <Link to="/agregarJugador" className="flex items-center gap-2">
                Agregar
              </Link>
            </button>
          </div>
        </section>
      </>
    );
}