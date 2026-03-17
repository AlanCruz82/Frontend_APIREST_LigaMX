import { apiFetch } from "./fetchClient";

const url = 'http://localhost:8080/api/v1/torneos';

export function obtenerTorneos(){
    return apiFetch(url);
}