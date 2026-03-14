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
      <>
        <h1>{tipo} jugador</h1>

        <form onSubmit={ejecucionForm}>
          <div>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Jorge"
              value={jugador.nombre}
              onChange={establecerCambio}
            />
          </div>

          <div>
            <label htmlFor="apellidoPaterno">Apellido Paterno</label>
            <input
              type="text"
              name="apellidoPaterno"
              placeholder="Gutierrez"
              value={jugador.apellidoPaterno}
              onChange={establecerCambio}
            />
          </div>

          <div>
            <label htmlFor="apellidoMaterno">Apellido Materno</label>
            <input
              type="text"
              name="apellidoMaterno"
              placeholder="Sosa"
              value={jugador.apellidoMaterno}
              onChange={establecerCambio}
            />
          </div>

          <div>
            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={jugador.fechaNacimiento}
              onChange={establecerCambio}
            />
          </div>

          <div>
            <label htmlFor="pais">Pais</label>
            <input
              type="text"
              name="pais"
              placeholder="Mexico"
              value={jugador.pais}
              onChange={establecerCambio}
            />
          </div>

          <div>
            <label htmlFor="selector-posicion">Elige la posicion</label>
            <select id="selector-posicion" value={jugador.posicion} name="posicion" 
            onChange={establecerCambio}>
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
            <label htmlFor="selector-equipo">Elige un equipo</label>
            <select id="selector-equipo" value={jugador.idEquipo} name="idEquipo"
            onChange={establecerCambio}>
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

          <button type="submit">{tipo}</button>
          <Link to="/jugadores">
            <button type="button">Regresar</button>
          </Link>
        </form>
      </>
    );
}