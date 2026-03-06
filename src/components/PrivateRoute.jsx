import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { LoginPage } from "../pages/LoginPage";

export function PrivateRoute({children}){
    //Obtenemos el valor del token del contexto creado en AuthContext
    const { token } = useContext(AuthContext);

    //Si el token es nulo redirigimos la ruta a la pagina del login
    if(!token){
        return <LoginPage/>;
    }else{
        //Caso contrario redigirimos a la pagina enviada como prop
        return children;
    }
}