import React, { useEffect, useState } from 'react';
import '../styles/grafiques.css';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Grafiques = () => {
    const [dadesActivitat, setDadesActivitat] = useState([]);
    const [dadesDieta, setDadesDieta] = useState([]);
    const [dadesBalanc, setDadesBalanc] = useState([]);

    useEffect(() => {
        const usuari = JSON.parse(localStorage.getItem('usuari'));
        if (!usuari) return;


        fetch(`http://localhost:8080/api/entrenaments/usuari/${usuari.id}`)
            .then(res => res.json())
            .then(data => {
                const agrupat = {};
                data.forEach(entrenament => {
                    const dia = entrenament.data;
                    const calories = entrenament.activitats?.reduce((acc, act) => acc + (act.calories || 0), 0) || 0;
                    agrupat[dia] = (agrupat[dia] || 0) + calories;
                });
                const result = Object.entries(agrupat).map(([data, calories]) => ({ data, calories }));
                result.sort((a, b) => new Date(a.data) - new Date(b.data));
                setDadesActivitat(result);
            });


        fetch(`http://localhost:8080/api/dietes/usuari/${usuari.id}`)
            .then(res => res.json())
            .then(data => {
                const agrupat = {};
                data.forEach(dieta => {
                    const dia = dieta.data;
                    const kcal = dieta.aliment?.calories || 0;
                    agrupat[dia] = (agrupat[dia] || 0) + kcal;
                });
                const result = Object.entries(agrupat).map(([data, calories]) => ({ data, calories }));
                result.sort((a, b) => new Date(a.data) - new Date(b.data));
                setDadesDieta(result);
            });


        Promise.all([
            fetch(`http://localhost:8080/api/entrenaments/usuari/${usuari.id}`).then(res => res.json()),
            fetch(`http://localhost:8080/api/dietes/usuari/${usuari.id}`).then(res => res.json())
        ])
            .then(([entrenaments, dietes]) => {
                const mapBalanç = {};

                entrenaments.forEach(ent => {
                    const dia = ent.data;
                    const calories = ent.activitats?.reduce((sum, act) => sum + (act.calories || 0), 0) || 0;
                    mapBalanç[dia] = mapBalanç[dia] || { cremades: 0, consumides: 0 };
                    mapBalanç[dia].cremades += calories;
                });

                dietes.forEach(dieta => {
                    const dia = dieta.data;
                    const kcal = dieta.aliment?.calories || 0;
                    mapBalanç[dia] = mapBalanç[dia] || { cremades: 0, consumides: 0 };
                    mapBalanç[dia].consumides += kcal;
                });

                const resultat = Object.entries(mapBalanç).map(([data, { cremades, consumides }]) => ({
                    data,
                    balanc: consumides - cremades
                }));

                resultat.sort((a, b) => new Date(a.data) - new Date(b.data));
                setDadesBalanc(resultat);
            });

    }, []);

    return (
        <div className="grafiques-pagina">
            <div className="grafiques-titol">
                <h1>Gràfiques de seguiment</h1>
                <p>Visualitza el teu progrés calòric</p>
            </div>

            <div className="grafiques-container">
                <h2>Calories cremades</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dadesActivitat}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="data" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="calories" stroke="red" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grafiques-container">
                <h2>Calories consumides</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dadesDieta}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="data" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="calories" stroke="green" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grafiques-container">
                <h2>Balanç calòric (consumides - cremades)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dadesBalanc}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="data" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="balanc" stroke="#0088cc" />
                    </LineChart>
                </ResponsiveContainer>
                <div className="grafiques-text">
                    <p>Positiu = superàvit calòric, Negatiu = dèficit calòric</p>
                </div>
            </div>
        </div>
    );
};

export default Grafiques;