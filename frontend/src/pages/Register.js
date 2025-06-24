import React, { useState } from 'react';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [formulari, setFormulari] = useState({
        nom: '',
        email: '',
        contrasenya: '',
        pes: '',
        alçada: '',
        rol: 'usuari'
    });

    const handleChange = (e) => {
        setFormulari({ ...formulari, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resposta = await fetch('http://localhost:8080/api/usuaris', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formulari)
            });
            const dades = await resposta.json();
            console.log('Usuari creat:', dades);
            localStorage.setItem('usuari', JSON.stringify(dades));
            alert('Usuari creat correctament!');
            navigate('/inici_usuari');
        } catch (error) {
            console.error('Error en crear l’usuari:', error);
            alert('Hi ha hagut un error.');
        }
    };

    return (
        <div className="register-container">
            <h2>Registre d'usuari</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="contrasenya" placeholder="Contrasenya" onChange={handleChange} required />
                <input type="number" name="pes" placeholder="Pes (kg)" step="0.1" onChange={handleChange} required />
                <input type="number" name="alçada" placeholder="Alçada (cm)" step="0.1" onChange={handleChange} required />
                <button type="submit">Registrar-se</button>
            </form>
            <p className="login-link">
                Ja tens compte?{' '}
                <span onClick={() => navigate('/login')}>
                    Inicia sessió!
                </span>
            </p>
        </div>
    );
};

export default Register;
