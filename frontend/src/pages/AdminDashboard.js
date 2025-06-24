import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const AdminDashboard = () => {
    const [usuaris, setUsuaris] = useState([]);
    const [aliments, setAliments] = useState([]);
    const [activitats, setActivitats] = useState([]);
    const [formEdicio, setFormEdicio] = useState(null);
    const navigate = useNavigate();

    const usuari = JSON.parse(localStorage.getItem('usuari'));

    useEffect(() => {
        if (!usuari || usuari.rol !== 'administrador') {
            navigate('/login');
        }
    }, [usuari, navigate]);

    useEffect(() => {
        fetch('http://localhost:8080/api/usuaris')
            .then(res => res.json())
            .then(setUsuaris);

        fetch('http://localhost:8080/api/aliments')
            .then(res => res.json())
            .then(setAliments);

        fetch('http://localhost:8080/api/activitats')
            .then(res => res.json())
            .then(setActivitats);
    }, []);

    const eliminarUsuari = (id) => {
        fetch(`http://localhost:8080/api/usuaris/${id}`, { method: 'DELETE' })
            .then(() => setUsuaris(usuaris.filter(u => u.id !== id)));
    };

    const iniciarEdicioAliment = (aliment) => {
        setFormEdicio({
            id: aliment.id,
            nom: aliment.nom,
            calories: aliment.calories,
            proteines: aliment.proteines || '',
            hidrats: aliment.hidrats || '',
            greixos: aliment.greixos || '',
            tipus: 'aliment'
        });
    };

    const iniciarEdicioActivitat = (act) => {
        setFormEdicio({
            id: act.id,
            nom: act.nom,
            calories: act.calories,
            tipus: 'activitat'
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setFormEdicio(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitAliment = async (e) => {
        e.preventDefault();
        try {
            const resposta = await fetch(`http://localhost:8080/api/aliments/${formEdicio.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nom: formEdicio.nom,
                    calories: parseFloat(formEdicio.calories),
                    proteines: parseFloat(formEdicio.proteines),
                    hidrats: parseFloat(formEdicio.hidrats),
                    greixos: parseFloat(formEdicio.greixos)
                })
            });

            if (resposta.ok) {
                const actualitzat = await resposta.json();
                setAliments(aliments.map(a => a.id === actualitzat.id ? actualitzat : a));
                setFormEdicio(null);
            } else {
                alert("Error en actualitzar l'aliment");
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const handleSubmitActivitat = async (e) => {
        e.preventDefault();
        try {
            const resposta = await fetch(`http://localhost:8080/api/activitats/${formEdicio.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nom: formEdicio.nom,
                    calories: parseFloat(formEdicio.calories)
                })
            });

            if (resposta.ok) {
                const actualitzat = await resposta.json();
                setActivitats(activitats.map(a => a.id === actualitzat.id ? actualitzat : a));
                setFormEdicio(null);
            } else {
                alert("Error en actualitzar l'activitat");
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Panell d'administració</h1>

            <section>
                <h2>Usuaris</h2>
                <ul>
                    {usuaris.map(usuari => (
                        <li key={usuari.id}>
                            {usuari.nom} ({usuari.email}) - {usuari.rol}
                            <button onClick={() => eliminarUsuari(usuari.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Aliments</h2>
                <ul>
                    {aliments.map(aliment => (
                        <li key={aliment.id}>
                            {aliment.id === formEdicio?.id && formEdicio?.tipus === 'aliment' ? (
                                <form onSubmit={handleSubmitAliment}>
                                    <input name="nom" value={formEdicio.nom} onChange={handleEditChange} required />
                                    <input name="calories" type="number" value={formEdicio.calories} onChange={handleEditChange} required />
                                    <input name="proteines" type="number" value={formEdicio.proteines} onChange={handleEditChange} />
                                    <input name="hidrats" type="number" value={formEdicio.hidrats} onChange={handleEditChange} />
                                    <input name="greixos" type="number" value={formEdicio.greixos} onChange={handleEditChange} />
                                    <button type="submit">Guardar</button>
                                    <button type="button" onClick={() => setFormEdicio(null)}>Cancel·lar</button>
                                </form>
                            ) : (
                                <>
                                    {aliment.nom} - {aliment.calories} kcal
                                    <button onClick={() => iniciarEdicioAliment(aliment)}>Editar</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Activitats</h2>
                <ul>
                    {activitats.map(act => (
                        <li key={act.id}>
                            {act.id === formEdicio?.id && formEdicio?.tipus === 'activitat' ? (
                                <form onSubmit={handleSubmitActivitat}>
                                    <input name="nom" value={formEdicio.nom} onChange={handleEditChange} required />
                                    <input name="calories" type="number" value={formEdicio.calories} onChange={handleEditChange} required />
                                    <button type="submit">Guardar</button>
                                    <button type="button" onClick={() => setFormEdicio(null)}>Cancel·lar</button>
                                </form>
                            ) : (
                                <>
                                    {act.nom} - {act.calories} kcal
                                    <button onClick={() => iniciarEdicioActivitat(act)}>Editar</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminDashboard;