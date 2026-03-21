import { NavBar } from "../../components/NavBar";
import { useState,useEffect} from "react";
import { eliminarEquipo, obtenerEquipos } from "../../api/equiposApi";
import { Link } from "react-router-dom";

export function EquiposPage(){
    //Estado para obtener la informacion de los equipos de la llamada a la api
    const [equipos, setEquipos] = useState([]);
    
    //Estados para establecer la ciudad o estadio por el que se va a hacer la busqueda
    const [ciudad,setCiudad] = useState("");
    const [estadio,setEstadio] = useState("");

    //Estados para establecer la ciudad o estadio en el que se realiza la busqueda al presionar el boton
    const [busCiudad, setBusCiudad] = useState("");
    const [busEstadio, setBusEstadio] = useState("");

    
    useEffect(() => {
        //Obtenemos los equipos haciendo llamada asincrona a la api a traves de getEquipos
        obtenerEquipos(busCiudad,busEstadio).then(
            datos => setEquipos(datos)
        ).catch(error => console.log(error))
    },[busCiudad,busEstadio])


    const eliminar = (id) => {
        eliminarEquipo(id).then(
            //Actualizamos los equipos para mostrarlos sin el equipo con el id enviado
            () => setEquipos(equipos.filter(e => e.id !== id))
        ).catch(() => alert('El equipo tiene jugadores o partidos asociados, no se puede eliminar'))
    }
    
    return (
      <>
        <NavBar />
        <h1 className="mt-20 text-2xl font-bold">Equipos</h1>

        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            name="ciudad"
            placeholder="CDMX"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />
          <button
            className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            onClick={() => setBusCiudad(ciudad)}
          >
            Filtrar
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="estadio">Estadio</label>
          <input
            type="text"
            name="estadio"
            placeholder="Estadio Banorte"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            value={estadio}
            onChange={(e) => setEstadio(e.target.value)}
          />
          <button
            className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            onClick={() => setBusEstadio(estadio)}
          >
            Filtrar
          </button>
        </div>

        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="bg-neutral-secondary-soft border-b border-default">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Equipo
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Ciudad
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Estadio
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Accion
                </th>
              </tr>
            </thead>
            <tbody>
              {equipos.map((equipo) => (
                <tr
                  key={equipo.id}
                  className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                >
                  <td className="px-6 py-4">{equipo.id}</td>
                  <td className="px-6 py-4">{equipo.nombre}</td>
                  <td className="px-6 py-4">{equipo.ciudad}</td>
                  <td className="px-6 py-4">{equipo.estadio}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link to={`/equipos/${equipo.id}`}>
                      <button
                        type="button"
                        className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
                      >
                        Editar
                      </button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => eliminar(equipo.id)}
                      className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-6">
          <label className="block mb-2 font-medium">Agregar equipo</label>

          <div>
            <button className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">
              <Link to="/agregarEquipo" className="flex items-center gap-2">
                Agregar
              </Link>
            </button>
          </div>
        </section>
      </>
    );
}