import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { peticionLogin } from "../api/auth";
import { useNavigate } from "react-router-dom";

export function LoginPage(){
    //Generamos las variables y sus estados mutables para almacenar las credenciales ingresadas
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");

    //Obtenemos el estado global para logear al usuario
    const { loginUser } = useContext(AuthContext);
    //Generamos el useNavigate para poder modificar la pagina renderizada
    const navigate = useNavigate();

    //Definimos la funcion flecha que vamos a ejecutar cuando se envie el formulario y que va a ingresar
    //al usuario dentro de nuestra pagina
    const ingresar = async (evento) => {
        // evento.preventDefault();
        try{
            //Hacemos la peticion http al backend para logear al usuario
            const token = await peticionLogin(usuario,contrasena);
            //Establecemos el token del usuario en el repositorio/contexto global (AuthContext)
            loginUser(token);
            //Redirigimos al usuario a la pagina principal(equipos)
            navigate("/equipos");
        }catch{
            //En caso de que no se pueda logear el usuario le avisamos al usuario por mensaje emergente
            alert("Credenciales incorrectas");
            //Limpiamos las credenciales ingresadas
            setUsuario("");
            setContrasena("");
        }
    };

    return(
        <div>
            <h1>!Bienvenido!, ingresa tus credenciales</h1>
            <form action={ingresar}>
                <input type="text" placeholder="usuario" value={usuario} 
                onChange={(usuario) => {setUsuario(usuario.target.value)}}/>

                <input type="password" placeholder="contrasena" value={contrasena} 
                onChange={(contrasena) => {setContrasena(contrasena.target.value)}}/>

                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}