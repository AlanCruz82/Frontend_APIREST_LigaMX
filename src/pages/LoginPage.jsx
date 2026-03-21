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

    return (
      <form className="max-w-sm mx-auto" action={ingresar}>
        <h1>
          !Bienvenido!
          <br />
          Liga MX
        </h1>
        <div className="mb-5">
          <label
            htmlFor="usuario"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Usuario
          </label>
          <input
            type="text"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="miusuario"
            onChange={(evento) => setUsuario(evento.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="contrasena"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Contraseña
          </label>
          <input
            type="password"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="••••••••"
            onChange={(evento) => setContrasena(evento.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Ingresar
        </button>
      </form>
    );
}