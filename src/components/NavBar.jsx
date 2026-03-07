import { Link } from "react-router-dom";
import { useContext } from "react";

export function NavBar(){
   return(
    <div>
        <nav>
            <ul>
                <li><Link to="/equipos">Equipos</Link></li>
                <li><Link to="/jugadores">Jugadores</Link></li>
                <li><Link to="/partidos">Partidos</Link></li>
                <li><Link to="/torneos">Torneos</Link></li>
            </ul>
        </nav>
    </div>
   ); 
}