import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function FormularioJugador ({valores = {}, accion, tipo, equipos = []}){
    //Estado general que vamos a utilizar para almacenar las propiedades del jugador
    const [ jugador, setJugador ] = useState({
      //Incializamos cada propiedad del jugador como vacio para el escenario en el que se quiere crear
      //el jugador
      nombre : "",
      apellidoPaterno : "",
      apellidoMaterno : "",
      fechaNacimiento : "",
      pais : "",
      posicion :"",
      idEquipo : "",
    });

    //Array para representar el enumerado del backend de las posiciones que puede tener un jugador
    const posiciones = [{id : 0 , nombre : 'PORTERO'},
                        {id : 1 , nombre : 'DEFENSA'},
                        {id : 2 , nombre : 'MEDIOCAMPISTA'},
                        {id : 3 , nombre : 'DELANTERO'}];

    //Refrescamos los valores de las propiedades del jugador, solamente en caso de que el objeto valores
    //tenga contenido y no este vacio
    useEffect(() => {
      //Verificamos si el objeto valores recibido como prop tiene contenido
      if (valores && Object.keys(valores).length > 0) {
        //Establecemos las propiedades del jugador con los valores recibidos
        setJugador({
          nombre: valores.nombre,
          apellidoPaterno: valores.apellidoPaterno,
          apellidoMaterno: valores.apellidoMaterno,
          fechaNacimiento: valores.fechaNacimiento,
          pais: valores.pais,
          posicion: valores.posicion,
          idEquipo: valores.equipo?.id,
        });
      }
    }, [valores]);
    
    const ejecucionForm = (evento) => {
        //Evitamos que la pagina se recargue al enviar el formulario
        evento.preventDefault();

        //Ejecutamos la funcion enviada como parametro que va a realizar la logica de la llamada a la api
        accion(jugador);
    }

    //Funcion para establecer el valor del campo del jugador por el que se esta colocando en el input
    const establecerCambio = (evento) => {
      //Obtenemos el nombre y el valor del input
      const { name, value } = evento.target;

      //Establecemos el valor del campo del jugdor por el del input
      setJugador({
        ...jugador, //Copiamos el jugador
        [name] : value, //Establecemos el valor del campo con el nombre del input con su valor actual
      })
    };

    return (
      <form onSubmit={ejecucionForm} className="max-w-sm mx-auto">
        <h1>{tipo} jugador</h1>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="nombre"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Jorge"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              value={jugador.nombre}
              onChange={establecerCambio}
            />
          </div>
          <div>
            <label
              htmlFor="apellidoPaterno"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Apellido Paterno
            </label>
            <input
              type="text"
              name="apellidoPaterno"
              placeholder="Gutierrez"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              value={jugador.apellidoPaterno}
              onChange={establecerCambio}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="apellidoMaterno"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Apellido Materno
            </label>
            <input
              type="text"
              name="apellidoMaterno"
              placeholder="Sosa"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              value={jugador.apellidoMaterno}
              onChange={establecerCambio}
            />
          </div>
          <div>
            <label
              htmlFor="pais"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Pais
            </label>
            <input
              type="text"
              name="pais"
              placeholder="Mexico"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              value={jugador.pais}
              onChange={establecerCambio}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="selector-posicion"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Elige la posicion
            </label>
            <select
              id="selector-posicion"
              value={jugador.posicion}
              name="posicion"
              className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              onChange={establecerCambio}
            >
              <option value="" disabled>
                ---Posicion---
              </option>
              {posiciones.map((posicion) => (
                <option key={posicion.id} value={posicion.nombre}>
                  {posicion.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="selector-equipo"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Elige un equipo
            </label>
            <select
              id="selector-equipo"
              value={jugador.idEquipo}
              name="idEquipo"
              className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              onChange={establecerCambio}
            >
              <option value="" disabled>
                ---Elige un equipo---
              </option>
              {equipos.map((equipo) => (
                <option key={equipo.id} value={equipo.id}>
                  {equipo.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
          <label
            htmlFor="fechaNacimiento"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Fecha de nacimiento
          </label>
          <input
            type="date"
            name="fechaNacimiento"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            value={jugador.fechaNacimiento}
            onChange={establecerCambio}
          />
        </div>
        </div>

        <div className="flex justify-center gap-3 mt-4">
          <button
            type="submit"
            className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
            {tipo}
          </button>
          <Link to="/jugadores">
            <button type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
            Regresar
            </button>
          </Link>
        </div>

      </form>
    );
}