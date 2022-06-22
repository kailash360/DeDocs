import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Outlet } from 'react-router';
import Landing from './pages/Landing'
import Navbar from './components/Navbar'
import UserDashboard from './pages/User/Dashboard'
import AdminDashboard from './pages/Admin/Dashboard'
import AuthContextProvider from './context/AuthContext'

function Decorators(){
  return(<>
    <Navbar></Navbar>
    <Outlet/>
  </>)
}

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Decorators />}>
            <Route path="/" exact element={<Landing />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
