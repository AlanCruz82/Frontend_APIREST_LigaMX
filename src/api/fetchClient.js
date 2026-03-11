export async function apiFetch(url, options = {}){
    //Obtenemos el toke del localStorage del navegador del usuario
    const token = localStorage.getItem("token");

    //Generamos los headers de la peticion http con las opciones pasadas por parametro
    const headers = {
        "Content-Type" : "application/json",
        ...options.headers,
    };

    //En caso de que el token no sea vacio lo agregamos al header authorization de la peticion
    if(token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    //Hacemos la peticion HTTP a la url pasada como parametro con los headers generados
    const response = await fetch(url, {...options, headers});

    //Si la respuesta HTTP no tiene un codigo 200 (ok), lanzamos una excepcion con el codigo
    //de estado obtenido en la respuesta
    if(!response.ok){
        throw new Error(`Error HTTP: ${response.status}`);
    }


    //Validacion para los escenarios en el que se elimine un recurso y el backend no regrese contenido en la
    //respuesta
    if(response.status == 204){
        return null;
    }
    
    //Regresamos la respuesta HTTP como un objeto JSON
    return response.json();
}