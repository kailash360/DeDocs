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
import MyDocuments from './pages/User/Documents'
import Document from './pages/User/Document'
import AdminDashboard from './pages/Admin/Dashboard'
import Requests from './pages/Admin/Requests'
import Request from './pages/Admin/Request'
import IssueDocument from './pages/Admin/IssueDocument'
import ModifyDocument from './pages/Admin/ModifyDocument'
import AdminDocuments from './pages/Admin/AdminDocuments';
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
              <Route path="/user/my-documents" element={<MyDocuments />} />
              <Route path="/user/my-documents/:documentId" element={<Document />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/requests" element={<Requests />} />
              <Route path="/admin/requests/:requestId" element={<Request />} />
              <Route path="/admin/requests/:requestId/issue" element={<IssueDocument />} />
              <Route path="/admin/requests/:requestId/modify" element={<ModifyDocument />} />
              <Route path="/admin/documents" element={<AdminDocuments />} />
              <Route path="/admin/documents/:documentId" element={<Document />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster></Toaster>
      </ContractContextProvider>
    </AuthContextProvider>
  );
}

export default App;
