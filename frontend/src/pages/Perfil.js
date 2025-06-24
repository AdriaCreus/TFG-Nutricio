import React, { useEffect, useState } from 'react';
import '../styles/perfil.css';
import { useNavigate } from 'react-router-dom';
import perfilDefault from '../assets/perfil.jpg';
import logo from '../assets/LOGO.png';

const Perfil = () => {
    const navigate = useNavigate();
    const [usuari, setUsuari] = useState(null);
    const [editat, setEditat] = useState({});
    const usuariGuardat = JSON.parse(localStorage.getItem('usuari'));
    const idUsuari = usuariGuardat?.id;

    useEffect(() => {
        if (!idUsuari) return;
        fetch(`http://localhost:8080/api/usuaris/${idUsuari}`)
            .then((res) => res.json())
            .then((data) => {
                setUsuari(data);
                setEditat(data);
            })
            .catch((error) => console.error('Error carregant usuari:', error));
    }, [idUsuari]);

    const handleChange = (e) => {
        setEditat({ ...editat, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!editat.nom || !editat.email || !editat.pes || !editat.alçada) {
            alert("Tots els camps són obligatoris.");
            return;
        }

        fetch(`http://localhost:8080/api/usuaris/${idUsuari}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editat)
        })
            .then((res) => {
                if (res.ok) alert('Perfil actualitzat correctament!');
                else alert('Error en actualitzar el perfil');
            })
            .catch((error) => {
                console.error('Error al desar:', error);
                alert('Error de connexió amb el servidor');
            });
    };

    if (!idUsuari) {
        return <p style={{ padding: "100px", textAlign: "center" }}>Error: usuari no autenticat.</p>;
    }

    if (!usuari) return <p style={{ padding: "100px", textAlign: "center" }}>Carregant...</p>;

    return (
        <div className="perfil-pagina">
            <nav className="barra-navegacio">
                <img src={logo} alt="Logo" className="logo" />
                <div className="navegacio-botons">
                    <button onClick={() => navigate('/inici_usuari')}>Resum diari</button>
                    <button onClick={() => navigate('/grafiques')}>Gràfiques</button>
                </div>
            </nav>

            <div className="perfil-container">
                <div className="perfil-card">
                    <img src={perfilDefault} alt="Imatge de perfil" className="foto-perfil" />
                    <h2>{editat.nom || 'El meu perfil'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="nom" value={editat.nom || ''} onChange={handleChange} placeholder="Nom" />
                        <input type="email" name="email" value={editat.email || ''} onChange={handleChange} placeholder="Email" />
                        <input type="number" name="pes" value={editat.pes || ''} onChange={handleChange} placeholder="Pes (kg)" />
                        <input type="number" name="alçada" value={editat.alçada || ''} onChange={handleChange} placeholder="Alçada (cm)" />
                        <button type="submit">Desar canvis</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
