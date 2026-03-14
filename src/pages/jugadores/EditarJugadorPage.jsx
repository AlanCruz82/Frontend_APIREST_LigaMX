import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { editarJugador, obtenerJugadorPorId } from "../../api/jugadoresApi";
import { obtenerEquipos } from "../../api/equiposApi";
import { FormularioJugador } from "../../components/FormularioJugador";

export function EditarJugadorPage(){
    //Obtenemos el id del jugador como parametro de la url del navegador
    const { id } = useParams();
    
    //Estado para almacenar el jugador elegido
    const [ jugador , setJugador ] = useState(null);
    //Estado para almacenar la lista de equipos disponibles (que vamos a pasar al formulario)
    const [ equipos, setEquipos ] = useState([]);

    //Funcion para poder redireccionar la pagina una vez se haya editado el jugador
    const navigate = useNavigate();

    //Llamada al servicio apiFecth para obtener los datos del jugador por su id y la lista de equipos disponibles
    useEffect(() => {
        obtenerJugadorPorId(id).then(
            setJugador
        ).catch(error => console.error(error))

        obtenerEquipos().then(
            setEquipos
        ).catch(error => console.error(error))

    },[id]);

    //Funcion que va a hacer la llamada a la api rest y que vamos a ocupar dentro del formulario
    function actualizarJugador(jugadorEditado){
        editarJugador(id,jugadorEditado).then(
            //Si se actualiza el jugador enviado, redirigidimos a la pagina principal de jugadores
            () => navigate("/jugadores")
        ).catch(error => console.error(error))
    };

    //Si el jugador no se ha cargado/establecido, esperamos y mientras mostramos un mensaje de informativo
    if(!jugador){
        <p>Cargando jugador...</p>
    }
    
    return(
        <>
           <FormularioJugador valores={jugador} accion={actualizarJugador} tipo={"Actualizar"} equipos={equipos}/> 
        </>
    );
}