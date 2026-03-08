import { NavBar } from "../components/NavBar";
import { useState,useEffect} from "react";
import { getEquipos } from "../api/getEquipos";
import { useParams } from "react-router-dom";
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

    const { id } = useParams();

    useEffect(() => {
        //Obtenemos los equipos haciendo llamada asincrona a la api a traves de getEquipos
        getEquipos(busCiudad,busEstadio).then(
            datos => setEquipos(datos)
        ).catch(error => console.log(error))
    },[busCiudad,busEstadio])

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
                            <button><Link to={`/equipos/${equipo.id}`}>Editar</Link></button>
                            <button>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <section>
                <label htmlFor="">Agregar equipo</label>
                <button>Agregar</button>
            </section>
        </>
    );
}