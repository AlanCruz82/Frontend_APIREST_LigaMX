import { crearEquipo } from "../api/equiposApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function AgregarEquipoPage(){  
    //Estado para almacenar las propiedades del nuevo equipo
    const [ nombre, setNombre ] = useState("");
    const [ ciudad, setCiudad ] = useState("");
    const [ estadio, setEstadio ] = useState("");

    //Funcion para poder redireccionar la pagina una vez se haya creado el nuevo equipo
    const navigate = useNavigate();

    //Funcion que vamos a ejecutar cuando se haga clic en registrar
    const registrar = (evento) => {
        //Eivtamos que el navegador intente recargar la pagina una vez se envie el formulario
        evento.preventDefault();

        //Generamos el objeto equipo con los nuevos datos que va a tener
        const nuevoEquipo = {
            nombre,
            ciudad,
            estadio
        }

        //Llamada a la api rest para actualizar el equipo con el id indicado y los campos enviados (equipo)
        crearEquipo(nuevoEquipo).then(
            //Si se actualiza el equipo enviado, redirigidimos a la pagina principal de equipos
            () => navigate("/equipos")
        ).catch(error => console.error(error))
    };

    return(
        <>
            <h1>Agregar equipo</h1>

            <form onSubmit={registrar}>
                <div>
                    <label htmlFor="nombre">Equipo</label>
                    <input type="text" name="nombre" placeholder="Club America"
                    onChange={e => setNombre(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="nombre">Ciudad</label>
                    <input type="text" name="nombre" placeholder="CDMX"
                    onChange={e => setCiudad(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="nombre">Estadio</label>
                    <input type="text" name="nombre" placeholder="Estadio Banorte"
                    onChange={e => setEstadio(e.target.value)}/>
                </div>

                <button type="submit">Registrar</button>
                <Link to="/equipos"><button type="button">Regresar</button></Link>
            </form>
        </>
    );
}