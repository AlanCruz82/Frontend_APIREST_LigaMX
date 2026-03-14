import { apiFetch } from "./fetchClient";

const url = 'http://localhost:8080/api/v1/jugadores';

export function obtenerJugadores(equipo){
    if(equipo){
        return apiFetch(`${url}/equipo/${equipo}`);
    }else{
        return apiFetch(url);
    }
}

export function registrarJugador(jugador){
    return apiFetch(`${url}/registrar`,{
        method: "POST",
        body: JSON.stringify(jugador),
    });
}

export function actualizarJugador(id,jugador){
    return apiFetch(`${url}/actualizar/${id}`,{
        method: "PUT",
        body: JSON.stringify(jugador),
    });
}

export function eliminarJugador(id){
    return apiFetch(`${url}/eliminar/${id}`, {
        method: "DELETE",
    });
}

export function obtenerJugadorPorId(id){
    return apiFetch(`${url}/${id}`);
}

export function editarJugador(id,jugador){
    return apiFetch(`${url}/actualizar/${id}`, {
        method: "PUT",
        body: JSON.stringify(jugador),
    })
}