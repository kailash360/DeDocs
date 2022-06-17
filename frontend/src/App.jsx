import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Outlet } from 'react-router';
import Landing from './pages/Landing'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'

function Decorators(){
  return(<>
    <Navbar></Navbar>
    <Outlet/>
  </>)
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Decorators />}>
          <Route path="/" exact element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
