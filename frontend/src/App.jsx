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
import MyRequests from './pages/User/Requests'
import AuthContextProvider from './context/AuthContext'
import ContractContextProvider from './context/ContractContext'

function Decorators(){
  return(<>
    <Navbar></Navbar>
    <Outlet/>
  </>)
}

function App() {
  return (
    <AuthContextProvider>
      <ContractContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Decorators />}>
              <Route path="/" exact element={<Landing />} />
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/my-requests" element={<MyRequests />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContractContextProvider>
    </AuthContextProvider>
  );
}

export default App;
