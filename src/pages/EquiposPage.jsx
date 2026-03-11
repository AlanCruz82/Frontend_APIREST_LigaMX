import { NavBar } from "../components/NavBar";
import { useState,useEffect} from "react";
import { eliminarEquipo, obtenerEquipos } from "../api/equiposApi";
import { Link } from "react-router-dom";

export function EquiposPage(){
    //Estado para obtener la informacion de los equipos de la llamada a la api
    const [equipos, setEquipos] = useState([]);
    
    //Estados para establecer la ciudad o estadio por el que se va a hacer la busqueda
    const [ciudad,setCiudad] = useState("");
    const [estadio,setEstadio] = useState("");

    //Estados para establecer la ciudad o estadio en el que se realiza la busqueda al presionar el boton
    const [busCiudad, setBusCiudad] = useState("");
    const [busEstadio, setBusEstadio] = useState("");

    
    useEffect(() => {
        //Obtenemos los equipos haciendo llamada asincrona a la api a traves de getEquipos
        obtenerEquipos(busCiudad,busEstadio).then(
            datos => setEquipos(datos)
        ).catch(error => console.log(error))
    },[busCiudad,busEstadio])


    const eliminar = (id) => {
        eliminarEquipo(id).then(
            //Actualizamos los equipos para mostrarlos sin el equipo con el id enviado
            () => setEquipos(equipos.filter(e => e.id !== id))
        ).catch(() => alert('El equipo tiene jugadores o partidos asociados, no se puede eliminar'))
    }
    return(
        <>
            <NavBar/>
            <h1>Equipos</h1>

            <div>
                <label htmlFor="ciudad">Ciudad</label>
                <input type="text" name="ciudad" placeholder="CDMX" value={ciudad}
                onChange={ciudad => setCiudad(ciudad.target.value)}/>
                <button onClick={() => setBusCiudad(ciudad)}>Filtrar</button>

                <label htmlFor="estadio">Estadio</label>
                <input type="text" name="estadio" placeholder="Estadio Banorte" value={estadio}
                onChange={estadio => setEstadio(estadio.target.value)}/>
                <button onClick={() => setBusEstadio(estadio)}>Filtrar</button>
            </div>

            <table border="3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Equipo</th>
                        <th>Ciudad</th>
                        <th>Estadio</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {equipos.map(equipo => (
                    <tr key={equipo.id}>
                        <td>{equipo.id}</td>
                        <td>{equipo.nombre}</td>
                        <td>{equipo.ciudad}</td>
                        <td>{equipo.estadio}</td>
                        <td>
                            <Link to={`/equipos/${equipo.id}`}><button>Editar</button></Link>
                            <button onClick={() => eliminar(equipo.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <section>
                <label>Agregar equipo</label>
                <div>
                    <button><Link to="/agregarEquipo">Agregar</Link></button>
                </div>
            </section>
        </>
    );
}