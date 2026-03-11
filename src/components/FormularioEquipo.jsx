import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function FormularioEquipo({valores = {}, accion, tipo}){
    
    //Estados para almacenar los valores iniciales del equipo enviados como parametro
    const [ nombre, setNombre ] = useState(valores.nombre || "");
    const [ ciudad, setCiudad ] = useState(valores.ciudad || "");
    const [ estadio, setEstadio ] = useState(valores.estadio || "");

    //Refrescando los valores del equipo ya que al inicio son vacios porque no se ha hecho la llamada a la api
    useEffect(()=>{
        setNombre(valores.nombre || "");
        setCiudad(valores.ciudad || "");
        setEstadio(valores.estadio || "");
    },[valores]);
 
    const ejecucionForm = (evento) => {
        //Evitamos que la pagina se recargue al enviar el formulario
        evento.preventDefault();

        //Generemos el equipo que vamos a enviar o editar con las propiedades enviadas o generadas
        const equipo = {
            nombre,
            ciudad,
            estadio,
        }

        //Ejecutamos la funcion enviada como parametro que va a realizar la logica de la llamada a la api
        accion(equipo);
    }

    return(
        <>
            <h1>{tipo} equipo</h1>
            
            <form onSubmit={ejecucionForm}>
                <div>
                    <label htmlFor="nombre">Equipo</label>
                    <input type="text" name="nombre" placeholder="Club America" value={nombre}
                    onChange={e => setNombre(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="ciudad">Ciudad</label>
                    <input type="text" name="ciudad" placeholder="CDMX" value={ciudad}
                    onChange={e => setCiudad(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="estadio">Estadio</label>
                    <input type="text" name="estadio" placeholder="Estadio Banorte" value={estadio}
                    onChange={e => setEstadio(e.target.value)}/>
                </div>

                <button type="submit">{tipo}</button>
                <Link to="/equipos"><button type="button">Regresar</button></Link>
            </form>
        </>
    );
}