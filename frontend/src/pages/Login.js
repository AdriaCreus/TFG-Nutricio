import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [credencials, setCredencials] = useState({
        email: '',
        contrasenya: ''
    });

    const handleChange = (e) => {
        setCredencials({ ...credencials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resposta = await fetch('http://localhost:8080/api/usuaris/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credencials)
            });

            if (resposta.ok) {
                const usuari = await resposta.json();
                console.log('Usuari rebut:', usuari);

                localStorage.setItem('usuari', JSON.stringify(usuari));
                alert('Sessió iniciada correctament!');
                console.log(usuari);

                if (usuari.rol === 'administrador') {
                    navigate('/admin');
                } else {
                    navigate('/inici_usuari');
                }
            } else {
                alert('Credencials incorrectes');
            }
        } catch (error) {
            console.error('Error en iniciar sessió:', error);
            alert('Error de connexió amb el servidor');
        }
    };

    return (
        <div className="login-container">
            <h2>Inici de sessió</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="contrasenya"
                    placeholder="Contrasenya"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Iniciar sessió</button>
            </form>
            <p className="register-link">
                Encara no tens compte?{' '}
                <span onClick={() => navigate('/register')}>Registra't!</span>
            </p>
        </div>
    );
};

export default Login;
