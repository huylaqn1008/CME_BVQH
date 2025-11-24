import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import Home from './components/Home';
import Employee from './components/Employee';
import CME from './components/CME';
import Profile from './components/Profile';
import Department from './components/Department';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />}>
          <Route index element={<Home />} />
          <Route path="department" element={<Department />} />
          <Route path="employee" element={<Employee />} />
          <Route path="CME" element={<CME />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
