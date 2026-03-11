import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export function NavBar(){
    //Obtenemos del contexto de autenticacion la funcion para poder eliminar el token del usuario del localStorage
    const { logoutUser } = useContext(AuthContext);

   return(
    <div>
        <nav>
            <ul>
                <li><Link to="/equipos">Equipos</Link></li>
                <li><Link to="/jugadores">Jugadores</Link></li>
                <li><Link to="/partidos">Partidos</Link></li>
                <li><Link to="/torneos">Torneos</Link></li>
                <li onClick={logoutUser}><Link>Cerrar sesion</Link></li>
            </ul>
        </nav>
    </div>
   ); 
}