import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getEquipoId } from "../api/getEquipoId";

export function DetalleEquipoPage(){
    //Obtenemos el id del equipo como parametro de la url del navegador
    const { id } = useParams();
    //Estado que ocupamos para almacenar y establecer el equipo solicitado
    const [ equipo, setEquipo ] = useState("");

    //Hacemos la llamada a la api para obtener los valores del equipo con el id especificado
    useEffect(() => {
        getEquipoId(id).then(
            dato => setEquipo(dato)
        ).catch(error => console.error(error))
    },[]);

    return(
        <>
            <h1>{equipo.nombre}</h1>
            <form action="submit">

                <label htmlFor="id">ID</label>
                <input type="number" disabled value={id}/>

                <label htmlFor="nombre">Equipo</label>
                <input type="text" name="nombre" placeholder="Club America" value={equipo.nombre}/>

                <label htmlFor="nombre">Ciudad</label>
                <input type="text" name="nombre" placeholder="CDMX" value={equipo.ciudad}/>

                <label htmlFor="nombre">Estadio</label>
                <input type="text" name="nombre" placeholder="Estadio Banorte" value={equipo.estadio}/>

                <button>Actualizar</button>
            </form>
        </>
    );
}