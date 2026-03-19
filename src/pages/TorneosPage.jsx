import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { obtenerPuntosTorneo, obtenerTorneos } from "../api/torneosApi";

export function TorneosPage(){
    //Estado para almacenar los torneos obtenidos
    const [ torneos, setTorneos ] = useState([]);
    //Estado para almacenar el torneo seleccionado
    const [ torneo, setTorneo ] = useState("");
    //Estado para almacenar los detalles del torneo seleccionado
    const [ detalles, setDetalles ] = useState([]);

    //Llamada a la api para obtener los torneos disponibles
    useEffect(()=>{
        obtenerTorneos().then(
            setTorneos
        ).catch(error => console.error(error))
    },[]);

    //Llamada a la api para obtener los detalles del torneo seleccionado
    useEffect(()=>{
        //Si el torneo ya ha sido seleccionado
        //Establecemos los detalles obtenidos de la respuesta de la api
        if(torneo){
            obtenerPuntosTorneo(torneo)
              .then(setDetalles)
              .catch((error) => console.error(error));
        }
    },[torneo]);

    return (
      <>
        <NavBar />
        <h1>Torneos</h1>

        <label htmlFor="selector-torneo">Elige un torneo</label>
        <select
          id="selector-torneo"
          value={torneo}
          onChange={(e) => setTorneo(e.target.value)}
        >
          <option value="" disabled>
            ---Elige un torneo---
          </option>
          {torneos.map((torneo) => (
            <option key={torneo.id} value={torneo.id}>
              {torneo.nombre} {torneo.anio}
            </option>
          ))}
        </select>

        {/* Si los detalles no tiene contenido, mostramos un mensaje informativo para avisarle al usuario */}
        {detalles.length === 0 ? (<p>Selecciona un torneo</p>) :
        <table border="3">
          <thead>
            <tr>
              <th>Posicion</th>
              <th>Equipo</th>
              <th>Derrotas</th>
              <th>Empates</th>
              <th>Victorias</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((detalle, indice) => (
              <tr key={detalle.equipo.id}>
                <td>{indice + 1}</td>
                <td>{detalle.equipo.nombre}</td>
                <td>{detalle.derrotas}</td>
                <td>{detalle.empates}</td>
                <td>{detalle.victorias}</td>
                <td>{detalle.puntos}</td>
              </tr>
            ))}
          </tbody>
        </table>}

      </>
    );
}