import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { peticionLogin } from "../api/auth";
import { Navigate, useNavigate } from "react-router-dom";

export function LoginPage(){
    //Generamos las variables y sus estados mutables para almacenar las credenciales ingresadas
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");

    //Obtenemos el estado global para logear al usuario
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    //Definimos la funcion flecha que vamos a ejecutar cuando se envie el formulario y que va a ingresar
    //al usuario dentro de nuestra pagina
    const ingresar = async (e) => {
        try{
            //Hacemos la peticion http al backend para logear al usuario
            const token = await peticionLogin(usuario,contrasena);
            //Establecemos el token del usuario en el repositorio/contexto global
            loginUser(token);
            //Redirigimos al usuario a la pagina principal(equipos)
            Navigate("equipos");
        }catch{
            //En caso de que no se pueda logear el usuario le avisamos al usuario por mensaje emergente
            alert("Credenciales incorrectas");
        }
    };

    return(
        <>
            <h1>!Bienvenido!, ingresa tus credenciales</h1>
            <form action={ingresar}>
                <input type="text" placeholder="Alan" value={usuario} 
                onChange={(usuario) => {setUsuario(usuario.target.value)}}/>

                <input type="password" placeholder="contrasena" value={contrasena} 
                onChange={(contrasena) => {setContrasena(contrasena.target.value)}}/>

                <button type="submit">Ingresar</button>
            </form>
        </>
    );
}