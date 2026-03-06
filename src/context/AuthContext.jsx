import { createContext, useState } from "react";

//Generamos el contexto que van a poder utilizar los hijos envueltos en el AuthProvider
export const AuthContext = createContext();

//Generamos el contenedor que va a compartir los datos del token y su estado
export function AuthProvider({children}) {
    //Inicializamos el estado del token con el valor de la llave "token"
    const [ token , setToken ] = useState(localStorage.getItem("token") || null);

    //Variable para poder ingresar con el token del usuario
    //y establecerlo en el estado del token
    const loginUser = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
    };

    //Variable para poder remover el token del navegador del usuario
    //y removerlo del estado del token
    const logoutUser = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    //Retornamos el componente authContext con los valores que va a compartir y los compomentes que puede envolver
    return(
        <AuthContext.Provider value={{token, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
}