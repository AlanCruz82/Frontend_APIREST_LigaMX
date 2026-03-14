import { PrivateRoute } from './components/PrivateRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { LoginPage } from './pages/LoginPage'
import { EquiposPage } from './pages/equipos/EquiposPage'
import { JugadoresPage } from './pages//jugadores/JugadoresPage'
import { TorneosPage } from './pages/TorneosPage'
import { PartidosPage } from './pages/PartidosPage'

import { EditarEquipoPage } from './pages/equipos/EditarEquipoPage'
import { AgregarEquipoPage } from './pages/equipos/AgregarEquipoPage'
import { AgregarJugadorPage } from './pages/jugadores/AgregarJugadorPage'
import { EditarJugadorPage } from './pages/jugadores/EditarJugadorPage'

function App() {
  return(
    //Definicion de las rutas de nuestra pagina
    //(A cada ruta diferente del login la envolvemos en nuestro compomente PrivateRoute para asegurarnos
    //de mostrarle la pagina solo a los usuarios logeados correctamente con el JWT)
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<LoginPage/>}/>

        <Route path='/equipos' element={
          <PrivateRoute>
            <EquiposPage/>
          </PrivateRoute>
        }/>

        <Route path='/equipos/:id' element={
          <PrivateRoute>
            <EditarEquipoPage/>
          </PrivateRoute>
        }/>

        <Route path='/agregarEquipo' element={
          <PrivateRoute>
            <AgregarEquipoPage/>
          </PrivateRoute>
        }/>

        <Route path='/jugadores' element={
          <PrivateRoute>
            <JugadoresPage/>
          </PrivateRoute>
        }/>

        <Route path='/jugadores/:id' element={
          <PrivateRoute>
            <EditarJugadorPage/>
          </PrivateRoute>
        }/>

        <Route path='/agregarJugador' element={
          <PrivateRoute>
            <AgregarJugadorPage/>
          </PrivateRoute>
        }/>

        <Route path='/partidos' element={
          <PrivateRoute>
            <PartidosPage/>
          </PrivateRoute>
        }/>

        <Route path='/torneos' element={
          <PrivateRoute>
            <TorneosPage/>
          </PrivateRoute>
        }/>

        <Route path='*' element={<LoginPage/>}/>
      </Routes> 
    </BrowserRouter>
  );
}

export default App
