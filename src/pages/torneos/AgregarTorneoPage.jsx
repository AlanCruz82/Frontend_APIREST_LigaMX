import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerEquipos } from "../../api/equiposApi";
import { crearTorneo } from "../../api/torneosApi";

export function AgregarTorneoPage(){
    //Estado para almacenar el torneo que vamos a registrar
    const [ torneo, setTorneo ] = useState({
        nombre : "",
        fechaInicio: "",
        fechaFin: "",
        anio: 2026,
        detallesTorneo: [],
    });

    //Estado para almacenar los equiposnuevosDetalles disponibles a la hora de crear el torneo
    const [ equipos, setEquipos ] = useState([]);

    //Funcion para redirigir la pagina al registrar un nuevo torneo
    const navigate = useNavigate();

    //Llamadas a la api para obtener los equipos disponibles con lo que pueden crear el torneo
    useEffect(() => {
      obtenerEquipos()
        .then(setEquipos)
        .catch((error) => console.error(error));
    }, []);

    //Funcion que se va a ocupar al enviar el formulario
    const registrar = (evento) => {
        //Evitamos que se recargue la pagina al enviar el formulario
        evento.preventDefault();

        //Validamos si el torneo cuenta con el numero requerido de equipos participando
        if(torneo.detallesTorneo.length !== 18){
          alert("El torneo no se puede crear con mas ni con menos de 18 equipos");
          return;
        }

        //Hacemos la llamada a la api para registrar el nuevo torneo
        crearTorneo(torneo).then(
          //Si se registro el partido, redirigimos la pagina principal de partidos
          navigate("/torneos")
        ).catch(error => console.error(error))
    };

    //Funcion para establecer el cambio de estado de los inputs
    const establecerCambio = (evento) => {
      //Obtenemos el nombre y el valor del input
      const { name, value } = evento.target;

      //Establecemos el nuevo valor de la propiedad con el nombre del input del torneo que tenemos como estado
      setTorneo({
        ...torneo, //Copiamos los valores que tenia el torneo
        [name] : value, //Establecemos el nuevo valor para la propiedad con el nombre del input
      })
    };

    //Funcion para establecer los equipos seleccionados dentro del select multiple en nuestro detalles del torneo
    const establecerDetalles = (evento) => {
      //Convertimos en un array las opciones seleccionadas y generamos un objeto con cada equipo seleccionados
      //con el formato esperado en el backend
      const nuevosDetalles = Array.from(evento.target.selectedOptions, opcion => ({
        idEquipo : parseInt(opcion.value),
        victorias : 0,
        derrotas : 0,
        empates : 0,
        puntos : 0,
      }));

      //Establecemos los nuevos detalles del torneo (equipos seleccionados) en el estado actual de nuestro torneo
      setTorneo((torneoActual => ({
        ...torneoActual,
        detallesTorneo : nuevosDetalles,
      })));
    }

    return (
        <form onSubmit={registrar} className="max-w-sm mx-auto">
          <h1>Registrar torneo</h1>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="selector-nombre" className="block mb-2.5 text-sm font-medium text-heading">Nombre del torneo</label>
              <select
                id="selector-nombre"
                className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                value={torneo.nombre}
                name="nombre"
                onChange={establecerCambio}
                required
              >
                <option value="" disabled>
                  ---Elige un nombre---
                </option>
                <option value="APERTURA">APERTURA</option>
                <option value="CLAUSURA">CLAUSURA</option>
              </select>
            </div>

            <div>
              <label htmlFor="anio" className="block mb-2.5 text-sm font-medium text-heading">Año</label>
              <input
                type="number"
                name="anio"
                min="0"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                value={torneo.anio}
                onChange={establecerCambio}
                required
              />
            </div>
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="fechaInicio" className="block mb-2.5 text-sm font-medium text-heading">Fecha de inicio</label>
              <input
                type="date"
                name="fechaInicio"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                value={torneo.fechaInicio}
                onChange={establecerCambio}
                required
              />
            </div>

            <div>
              <label htmlFor="fechaFin" className="block mb-2.5 text-sm font-medium text-heading">Fecha de fin</label>
              <input
                type="date"
                name="fechaFin"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                value={torneo.fechaFin}
                onChange={establecerCambio}
                required
              />
            </div>
          </div>

          <div>
              <label htmlFor="selector-equipos" className="block mb-2.5 text-sm font-medium text-heading">Equipos participantes</label>
              <select
                multiple
                id="selector-equipos"
                
                className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                value={torneo.detallesTorneo.map(equipo => equipo.idEquipo)}
                name="detallesTorneo"
                onChange={establecerDetalles}
                required
              >
                <option value="" disabled>
                  ---Equipos participantes---
                </option>
                {equipos.map((equipo) => (
                  <option key={equipo.id} value={equipo.id}>
                    {equipo.nombre}
                  </option>
                ))}
              </select>
            </div>

          <div className="flex justify-center gap-3 mt-4">
            <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Agregar</button>
            <Link to="/torneos">
            <button type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
            Regresar
            </button>
          </Link>
          </div>
        </form>
    );

}