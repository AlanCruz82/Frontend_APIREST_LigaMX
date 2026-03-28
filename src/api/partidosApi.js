import { apiFetch } from "./fetchClient";

const url = 'http://localhost:8080/api/v1/partidos';

export function partidosEquipoTorneo(idEquipo, idTorneo){
    return apiFetch(`${url}/torneo_y_equipo/${idTorneo}/${idEquipo}`);
}

export function crearPartido(partido){
    return apiFetch(`${url}/registrar`, {
        method: "POST",
        body: JSON.stringify(partido),
    });
}

export function eliminarPartido(id){
    return apiFetch(`${url}/eliminar/${id}`, {
        method: "DELETE",
    });
}