const url = 'http:localhost:8080/log-in';

export async function peticionLogin(usuario, contrasena){
    //Generamos la peticion http al backend con las credenciales ingresadas por el login
    const response = await fetch(url,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            username : usuario,
            password : contrasena,
        })
    })

    //Si el codigo de estado de la respuesta no es 200 (ok), lanzamos un error con el mensaje de las credenciales
    if(!response.ok){
        throw new Error("Credenciales incorrectas");
    }

    //Obtenemos y regresamos el jwt de la respuesta http obtenida del backend
    return { jwt } = response.json();
}