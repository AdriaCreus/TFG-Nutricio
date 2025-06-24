import React, { useState } from 'react';
import '../styles/afegirEntrenament.css';

const AfegirEntrenament = () => {
    const usuari = JSON.parse(localStorage.getItem('usuari'));
    const usuariId = usuari?.id;

    const activitatsPredefinides = [
        { id: 1, nom: 'Córrer' },
        { id: 2, nom: 'Nadar' },
        { id: 3, nom: 'Caminar' },
        { id: 4, nom: 'Entrenament Força' }
    ];

    const [form, setForm] = useState({
        nomActivitat: '',
        duracio: '',
        calories: '',
        data: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const entrenament = {
            activitats: [
                {
                    nom: form.nomActivitat,
                    calories: parseFloat(form.calories),
                    usuari: { id: usuariId }
                }
            ],
            duracio: parseFloat(form.duracio),
            data: form.data,
            usuari: { id: usuariId }
        };


        try {
            const res = await fetch('http://localhost:8080/api/entrenaments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entrenament)
            });

            if (res.ok) {
                alert('Entrenament afegit correctament!');
                setForm({ nomActivitat: '', duracio: '', calories: '', data: '' });
            } else {
                alert('Error en afegir entrenament');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de connexió amb el servidor');
        }
    };

    return (
        <div className="afegir-entrenament-container">
            <h2>Afegir entrenament</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Activitat:
                    <select name="nomActivitat" value={form.nomActivitat} onChange={handleChange} required>
                        <option value="">Selecciona una activitat</option>
                        {activitatsPredefinides.map((act) => (
                            <option key={act.id} value={act.nom}>{act.nom}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Calories cremades:
                    <input
                        type="number"
                        name="calories"
                        value={form.calories}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Duració (minuts):
                    <input
                        type="number"
                        name="duracio"
                        value={form.duracio}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Data:
                    <input
                        type="date"
                        name="data"
                        value={form.data}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit">Afegir entrenament</button>
            </form>
        </div>
    );
};

export default AfegirEntrenament;
