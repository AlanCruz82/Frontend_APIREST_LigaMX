import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { obtenerEquipoId } from "../api/equiposApi";
import { editarEquipo } from "../api/equiposApi";
import { FormularioEquipo } from "../components/FormularioEquipo";
import { useNavigate } from "react-router-dom";

export function EditarEquipoPage(){
    //Obtenemos el id del equipo como parametro de la url del navegador
    const { id } = useParams();
    
    //Estado para almacenar el equipo especificado con el id de la url
    const [ equipo, setEquipo ] = useState({});

    //Funcion para poder redireccionar la pagina una vez se haya editado el equipo
    const navigate = useNavigate();

    //Hacemos la llamada a la api para obtener los valores del equipo con el id especificado
    useEffect(() => {
        obtenerEquipoId(id).then(
            dato => {
                //Establecemos el equipo obtenido con el id enviado
                setEquipo(dato)
            }
        ).catch(error => console.error(error))
    },[id]);

    //Funcion que vamos a mandar como prop al formEquipo y que se va a ejecutar dentro del compomente
    function actualizarEquipo(equipoEditado){
        //Llamada a la api rest para actualizar el equipo con el id indicado y sus nuevos valores
        editarEquipo(id,equipoEditado).then(
            //Si se actualiza el equipo enviado, redirigidimos a la pagina principal de equipos
            () => navigate("/equipos")
        ).catch(error => console.error(error))
    };

    return(
        <>
           <FormularioEquipo valores={equipo} accion={actualizarEquipo} tipo={"Actualizar"}/> 
        </>
    );
}