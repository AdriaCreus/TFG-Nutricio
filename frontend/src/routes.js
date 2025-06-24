import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import IniciUsuari from './pages/IniciUsuari';
import Grafiques from './pages/Grafiques';
import ActivitatFisica from './pages/ActivitatFisica';
import AfegirEntrenament from './pages/AfegirEntrenament';
import Dieta from './pages/Dieta';
import AfegirAliment from './pages/AfegirAliment';
import AdminDashboard from './pages/AdminDashboard';
import RutaProtegidaAdmin from './components/RutaProtegidaAdmin';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/inici_usuari" element={<IniciUsuari />} />
            <Route path="/grafics" element={<Grafiques />} />
            <Route path="/activitat_fisica" element={<ActivitatFisica />} />
            <Route path="/afegir-entrenament" element={<AfegirEntrenament />} />
            <Route path="/dieta" element={<Dieta />} />
            <Route path="/afegir-aliment" element={<AfegirAliment />} />
            <Route
                path="/admin"
                element={
                    <RutaProtegidaAdmin>
                        <AdminDashboard />
                    </RutaProtegidaAdmin>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
