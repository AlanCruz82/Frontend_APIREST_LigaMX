import { apiFetch } from "./fetchClient";

const url = 'http://localhost:8080/api/v1/equipos';

export function obtenerEquipos(ciudad,estadio){
    //Si el usuario quiere filtrar los equipos por la ciudad enviada hacemos la llamada al endpoint
    //especificado en el backend
    if(ciudad){
        return apiFetch(`${url}/ciudad/${ciudad}`);
    //SI el usuario quiere filtrar por estadio consumimos el endpoint definido en el backend
    }else if(estadio){
        return apiFetch(`${url}/estadio/${estadio}`);
    //Caso contrario hacemos llamada al endpoint para obtener todos los equipos
    }else{
        return apiFetch(url);
    }
}

export function obtenerEquipoId(id){
    return apiFetch(`${url}/${id}`);
}

export function editarEquipo(id,equipo){
    return apiFetch(`${url}/actualizar/${id}`,{
        method: "PUT",
        body: JSON.stringify(equipo),
    });
}

export function eliminarEquipo(id){
    return apiFetch(`${url}/eliminar/${id}`, {
        method: "DELETE"
    });
}

export function crearEquipo(nuevoEquipo){
    return apiFetch(`${url}/registrar`, {
        method: "POST",
        body: JSON.stringify(nuevoEquipo),
    });
}