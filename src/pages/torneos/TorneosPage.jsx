import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { Link } from "react-router-dom";
import { obtenerPuntosTorneo, obtenerTorneos } from "../../api/torneosApi";

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
        <h1 className="mt-20 text-2xl font-bold">Torneos</h1>

        <label
          htmlFor="selector-torneo"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Elige un torneo
        </label>
        <select
          id="selector-torneo"
          className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
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

        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          {/* Si los detalles no tiene contenido, mostramos un mensaje informativo para avisarle al usuario */}
          {detalles.length === 0 ? (
            <p>Selecciona un torneo</p>
          ) : (
            <table
              className="w-full text-sm text-left rtl:text-right text-body"
              s
            >
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Posicion
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Equipo
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Derrotas
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Empates
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Victorias
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Puntos
                  </th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((detalle, indice) => (
                  <tr
                    key={detalle.equipo.id}
                    className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                  >
                    <td className="px-6 py-4">{indice + 1}</td>
                    <td className="px-6 py-4">{detalle.equipo.nombre}</td>
                    <td className="px-6 py-4">{detalle.derrotas}</td>
                    <td className="px-6 py-4">{detalle.empates}</td>
                    <td className="px-6 py-4">{detalle.victorias}</td>
                    <td className="px-6 py-4 font-bold">{detalle.puntos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <section className="mt-6">
          <label className="block mb-2 font-medium">Agregar torneo</label>
          <div>
            <button className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">
              <Link to="/agregarTorneo" className="flex items-center gap-2">
                Agregar
              </Link>
            </button>
          </div>
        </section>
      </>
    );
}