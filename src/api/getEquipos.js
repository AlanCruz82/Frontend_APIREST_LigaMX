import { apiFetch } from "./fetchClient";

export function getEquipos(){
    return apiFetch('http://localhost:8080/api/v1/equipos');
}