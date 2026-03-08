import { apiFetch } from "./fetchClient";

export function getEquipoId(id){
    return apiFetch(`http://localhost:8080/api/v1/equipos/${id}`);
}