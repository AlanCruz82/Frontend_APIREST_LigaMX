import { apiFetch } from "./fetchClient";

export function getEquipos(ciudad,estadio){
    const url = 'http://localhost:8080/api/v1/equipos';

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