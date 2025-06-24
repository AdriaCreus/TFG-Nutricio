import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/inici_usuari.css';
import logo from '../assets/LOGO.png';

const IniciUsuari = () => {
    const navigate = useNavigate();

    const caloriesCremades = 420;
    const caloriesConsumides = 1300;

    return (
        <div className="inici-usuari">
            <header className="inici-header">
                <img src={logo} alt="Iron Crois Logo" className="inici-logo" />
                <div className="nav-buttons">
                    <button onClick={() => navigate('/perfil')}>Perfil</button>
                    <button onClick={() => navigate('/grafics')}>Gràfics</button>
                </div>
            </header>

            <main className="inici-content">
                <div className="resum-container">
                    <h1 className="resum-title">Resum diari</h1>
                    <div className="card-section">
                        <div className="card" onClick={() => navigate('/activitat_fisica')}>
                            <h3>Activitat Física</h3>
                            <p>{caloriesCremades} kcal cremades</p>
                            <div className="bar">
                                <div className="bar-fill" style={{ width: `${Math.min(caloriesCremades / 20, 100)}%` }}></div>
                            </div>
                        </div>

                        <div className="card" onClick={() => navigate('/dieta')}>
                            <h3>Alimentació</h3>
                            <p>{caloriesConsumides} kcal consumides</p>
                            <div className="bar">
                                <div className="bar-fill" style={{ width: `${Math.min(caloriesConsumides / 25, 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default IniciUsuari;
