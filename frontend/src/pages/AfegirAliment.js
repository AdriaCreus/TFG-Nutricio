import React, { useState } from 'react';
import '../styles/afegirAliment.css';

const AfegirAliment = () => {
    const usuari = JSON.parse(localStorage.getItem('usuari'));
    const usuariId = usuari?.id;

    const [form, setForm] = useState({
        nom: '',
        calories: '',
        proteines: '',
        hidrats: '',
        greixos: '',
        quantitat: '',
        data: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nouAliment = {
            nom: form.nom,
            calories: parseFloat(form.calories),
            proteines: parseFloat(form.proteines),
            hidrats: parseFloat(form.hidrats),
            greixos: parseFloat(form.greixos),
            usuari: { id: usuariId }
        };

        try {
            const resAliment = await fetch('http://localhost:8080/api/aliments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nouAliment)
            });

            if (!resAliment.ok) {
                alert("Error en crear l’aliment.");
                return;
            }
            const alimentCreat = await resAliment.json();
            const dieta = {
                data: form.data,
                quantitat: parseFloat(form.quantitat),
                aliment: { id: alimentCreat.id },
                usuari: { id: usuariId }
            };

            const resDieta = await fetch('http://localhost:8080/api/dietes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dieta)
            });

            if (resDieta.ok) {
                alert('Aliment i dieta afegits correctament!');
                setForm({
                    nom: '', calories: '', proteines: '', hidrats: '', greixos: '',
                    quantitat: '', data: ''
                });
            } else {
                alert('Error en guardar la dieta.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de connexió amb el servidor');
        }
    };

    return (
        <div className="afegir-aliment-container">
            <h2>Afegir aliment consumit</h2>
            <form onSubmit={handleSubmit}>
                <label>Nom:<input type="text" name="nom" value={form.nom} onChange={handleChange} required /></label>
                <label>Calories:<input type="number" name="calories" value={form.calories} onChange={handleChange} required /></label>
                <label>Proteïnes:<input type="number" name="proteines" value={form.proteines} onChange={handleChange} required /></label>
                <label>Hidrats:<input type="number" name="hidrats" value={form.hidrats} onChange={handleChange} required /></label>
                <label>Greixos:<input type="number" name="greixos" value={form.greixos} onChange={handleChange} required /></label>
                <label>Quantitat (grams):<input type="number" name="quantitat" value={form.quantitat} onChange={handleChange} required /></label>
                <label>Data:<input type="date" name="data" value={form.data} onChange={handleChange} required /></label>
                <button type="submit">Afegir aliment</button>
            </form>
        </div>
    );
};

export default AfegirAliment;
