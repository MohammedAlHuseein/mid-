import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register"; 
import Home from "./components/Home";
import AgencyDashboard from "./components/AgencyDashboard";
import "./App.css";
import { UserProvider } from "./Context/UserContext";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtoctedRoute";
import Login from "./components/login";


function App() {
  return (
    <UserProvider>
      <ToastContainer position="top-center" autoClose={10000} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<Register/>} />
        <Route path="/Home"
        element={
        <ProtectedRoute>
        <Home /> 
        </ProtectedRoute>
              }/>
        <Route path="/AgencyDashboard" element={
          <AgencyDashboard/>

        }/>
               
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;