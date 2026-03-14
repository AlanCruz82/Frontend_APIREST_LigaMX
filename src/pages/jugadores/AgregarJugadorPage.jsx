import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarJugador } from "../../api/jugadoresApi";
import { FormularioJugador } from "../../components/FormularioJugador";
import { obtenerEquipos } from "../../api/equiposApi";

export function AgregarJugadorPage() {
  //Funcion para manejar el cambio de pagina
  const navigate = useNavigate();

  //Estado para almacenar los equipos que vamos a pasar como prop al formulario (para mostrarlos en el select)
  const [ equipos, setEquipos ] = useState([]);

  //Llamada a la api para registrar el nuevo jugador
  function registrar(jugador) {
    registrarJugador(jugador).then(
        //Al registrar el nuevo jugador, redirigimos la pagina a la vista principal de jugadores
        () => navigate("/jugadores")
      )
      .catch((error) => console.error(error));
  }

  //Llamada al cliente apifecth para obtener los equipos (del select del formulario)
  useEffect(()=>{
    obtenerEquipos().then(
        setEquipos
    ).catch(error => console.error(error))
  },[]);

  return (
    <>
      <FormularioJugador accion={registrar} tipo={"Crear"} equipos={equipos}/>
    </>
  );
}
