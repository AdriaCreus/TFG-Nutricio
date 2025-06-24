import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import logo from '../assets/LOGO.png';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <header className="header-bar">
                <img src={logo} alt="Iron Crois Logo" className="logo" />
                <div className="nav-buttons">
                    <button onClick={() => navigate('/login')}>Iniciar sessió</button>
                    <button onClick={() => navigate('/register')}>Registrar-se</button>
                </div>
            </header>

            <main className="main-section">
                <div className="info-wrapper">
                    <section className="info-section">
                        <h2>Què és Iron Crois?</h2>
                        <p>
                            Iron Crois és una plataforma web que permet a l’usuari fer un seguiment de la seva alimentació i activitat física, d’una forma estructurada, visual i personalitzada. L’objectiu és facilitar l’adquisició d’hàbits saludables i tenir una visió clara del progrés.
                        </p>
                    </section>

                    <section className="info-section">
                        <h2>Com va néixer Iron Crois?</h2>
                        <p>
                            Aquest projecte neix com una proposta de treball final de grau, amb la voluntat d’aportar una eina funcional i accessible que combini tecnologia i salut. Inspirat en la necessitat d’una aplicació senzilla i clara, Iron Crois vol convertir-se en un acompanyament diari per a usuaris que busquen millorar el seu benestar.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Home;
