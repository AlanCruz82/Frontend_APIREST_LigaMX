import { NavBar } from "../components/NavBar";
import { useState,useEffect } from "react";
import { getEquipos } from "../api/getEquipos";

export function EquiposPage(){
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
        //Obtenemos los equipos haciendo llamada asincrona a la api a traves de getEquipos
        getEquipos().then(
            datos => setEquipos(datos)
        ).catch(error => console.log(error))
    },[])

    return(
        <>
            <NavBar/>
            <h1>Pagina de equipos</h1>
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
                            <button>Editar</button>
                            <button>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}