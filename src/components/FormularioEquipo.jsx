import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function FormularioEquipo({valores = {}, accion, tipo}){
    
    //Estado para almacenar los valores del equipo
    const [ equipo, setEquipo ] = useState({
        //Inicializamos el valor de cada propiedad en vacio (escenario inicial en el que se quiere crear un equipo)
        nombre : "",
        ciudad : "",
        estadio : "",
    });

    //Refrescamos los valores del los inputs en caso de que la prop valores tenga contenido o haya cambiado
    //de valor
    useEffect(()=>{
        if(valores && Object.keys(valores).length > 0){
            //Establecemos los valores enviados como prop y en caso de no tener un valor asignado las
            //dejamos vacias
            setEquipo({
                nombre : valores.nombre || "",
                ciudad : valores.ciudad || "",
                estadio : valores.estadio || "",
            });
        }
    },[valores]);
 
    const ejecucionForm = () => {
        //Ejecutamos la funcion enviada como parametro que va a realizar la logica de la llamada a la api
        accion(equipo);
    }

    //Funcion para establecer el valor del campo del equipo por el que se esta colocando en el input
    const establecerCambio = (evento) => {
      //Obtenemos el nombre y el valor del input
      const { name, value } = evento.target;

      //Establecemos el valor del campo del equipo por el del input
      setEquipo({
        ...equipo, //Copiamos el equipo
        [name] : value, //Establecemos el valor del campo con el nombre del input con su valor actual
      })
    };

    return (
      <form className="max-w-sm mx-auto" action={ejecucionForm}>
        <h1>{tipo} Equipo</h1>
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Club America"
            value={equipo.nombre}
            onChange={establecerCambio}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="ciudad"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Ciudad
          </label>
          <input
            type="text"
            name="ciudad"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="CDMX"
            value={equipo.ciudad}
            onChange={establecerCambio}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="estadio"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Estadio
          </label>
          <input
            type="text"
            name="estadio"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Estadio Banorte"
            value={equipo.estadio}
            onChange={establecerCambio}
            required
          />
        </div>

        <div className="flex justify-center gap-3 mt-4">
          <button
            type="submit"
            className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
            {tipo}
          </button>
          <Link to="/equipos">
            <button type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
            Regresar
            </button>
          </Link>
        </div>
      </form>
    );
}