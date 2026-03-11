import { PrivateRoute } from './components/PrivateRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { LoginPage } from './pages/LoginPage'
import { EquiposPage } from './pages/EquiposPage'
import { JugadoresPage } from './pages/JugadoresPage'
import { TorneosPage } from './pages/TorneosPage'
import { PartidosPage } from './pages/PartidosPage'

import { EditarEquipoPage } from './pages/EditarEquipoPage'
import { AgregarEquipoPage } from './pages/AgregarEquipoPage'

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
