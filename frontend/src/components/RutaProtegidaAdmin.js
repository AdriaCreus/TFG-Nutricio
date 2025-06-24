import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaProtegidaAdmin = ({ children }) => {
    const usuari = JSON.parse(localStorage.getItem('usuari'));

    if (!usuari || usuari.rol !== 'administrador') {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RutaProtegidaAdmin;
