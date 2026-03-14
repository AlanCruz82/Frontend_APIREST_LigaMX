import { crearEquipo } from "../../api/equiposApi";
import { FormularioEquipo } from "../../components/FormularioEquipo";
import { useNavigate } from "react-router-dom";

export function AgregarEquipoPage(){  
    const navigate = useNavigate();

    //Funcion que se va a pasar como prop al formulario del equipo que se va a encargar de registrar el equipo
    //recbido como parametro
    function registrar(nuevoEquipo){
        //Llamada a la api rest para actualizar el equipo con el id indicado y los campos enviados (equipo)
        crearEquipo(nuevoEquipo).then(
            //Si se actualiza el equipo enviado, redirigidimos a la pagina principal de equipos
            () => navigate("/equipos")
        ).catch(error => console.error(error))
    };

    return(
        <>
           <FormularioEquipo accion={registrar} tipo={"Crear"}/>
        </>
    );
}