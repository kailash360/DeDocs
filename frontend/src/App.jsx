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
import MyRequests from './pages/User/Requests'
import NewRequest from './pages/User/NewRequest'
import AdminDashboard from './pages/Admin/Dashboard'
import AuthContextProvider from './context/AuthContext'
import ContractContextProvider from './context/ContractContext'
import {Toaster} from 'react-hot-toast'

function Decorators(){
  return(<>
    <Navbar></Navbar>
    <Outlet/>
  </>)
}

function App() {
  document.title = 'DeDocs'
  return (
    <AuthContextProvider>
      <ContractContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Decorators />}>
              <Route path="/" exact element={<Landing />} />
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/my-requests" element={<MyRequests />} />
              <Route path="/user/new-request" element={<NewRequest />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster></Toaster>
      </ContractContextProvider>
    </AuthContextProvider>
  );
}

export default App;
