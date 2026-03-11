import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { obtenerEquipoId } from "../api/equiposApi";
import { editarEquipo } from "../api/equiposApi";
import { Link } from "react-router-dom";

export function EditarEquipoPage(){
    //Obtenemos el id del equipo como parametro de la url del navegador
    const { id } = useParams();
    
    //Estado para almacenar las propiedades del equipo
    const [ nombre, setNombre ] = useState("");
    const [ ciudad, setCiudad ] = useState("");
    const [ estadio, setEstadio ] = useState("");

    //Funcion para poder redireccionar la pagina una vez se haya editado el equipo
    const navigate = useNavigate();

    //Hacemos la llamada a la api para obtener los valores del equipo con el id especificado
    useEffect(() => {
        obtenerEquipoId(id).then(
            equipo => {
                //Establecemos el valor de cada campo del equipo que vamos a usar para rellenar cada input
                setNombre(equipo.nombre);
                setCiudad(equipo.ciudad);
                setEstadio(equipo.estadio);
            }
        ).catch(error => console.error(error))
    },[id]);

    //Funcion que vamos a ejecutar cuando se haga clic en actualizar
    const actualizarEquipo = (evento) => {
        //Eivtamos que el navegador intente recargar la pagina una vez se envie el formulario
        evento.preventDefault();


        //Generamos el objeto equipo con los nuevos datos que va a tener
        const equipoEditado = {
            nombre,
            ciudad,
            estadio
        }

        //Llamada a la api rest para actualizar el equipo con el id indicado y los campos enviados (equipo)
        editarEquipo(id,equipoEditado).then(
            //Si se actualiza el equipo enviado, redirigidimos a la pagina principal de equipos
            () => navigate("/equipos")
        ).catch(error => console.error(error))
    };

    return(
        <>
            <h1>Editar equipo</h1>
            <h2>{nombre}</h2>

            <form onSubmit={actualizarEquipo}>

                <div>
                    <label htmlFor="id">ID</label>
                    <input type="number" disabled value={id}/>
                </div>

                <div>
                    <label htmlFor="nombre">Equipo</label>
                    <input type="text" name="nombre" placeholder="Club America" value={nombre}
                    onChange={e => setNombre(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="nombre">Ciudad</label>
                    <input type="text" name="nombre" placeholder="CDMX" value={ciudad}
                    onChange={e => setCiudad(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="nombre">Estadio</label>
                    <input type="text" name="nombre" placeholder="Estadio Banorte" value={estadio}
                    onChange={e => setEstadio(e.target.value)}/>
                </div>

                <button type="submit">Actualizar</button>
                <Link to="/equipos"><button type="button">Regresar</button></Link>
            </form>
        </>
    );
}