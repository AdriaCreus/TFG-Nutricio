import React, { useEffect, useState } from 'react';
import '../styles/dieta.css';
import { useNavigate } from 'react-router-dom';

const Dieta = () => {
    const [dataSeleccionada, setDataSeleccionada] = useState('');
    const [dietes, setDietes] = useState([]);
    const [usuariId, setUsuariId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const usuari = JSON.parse(localStorage.getItem('usuari'));
        if (usuari) {
            setUsuariId(usuari.id);
        }
    }, []);

    const carregarDietes = async () => {
        if (!dataSeleccionada || !usuariId) return;

        try {
            const resposta = await fetch(`http://localhost:8080/api/dietes/data?data=${dataSeleccionada}&usuariId=${usuariId}`);
            const dades = await resposta.json();
            setDietes(Array.isArray(dades) ? dades : []);
        } catch (error) {
            console.error('Error carregant dietes:', error);
            setDietes([]);
        }
    };

    const handleDataChange = (e) => {
        setDataSeleccionada(e.target.value);
    };

    const handleAfegir = () => {
        navigate('/afegir-aliment');
    };

    const totals = dietes.reduce((acc, dieta) => {
        acc.calories += (dieta.aliment?.calories || 0) ;
        acc.proteines += (dieta.aliment?.proteines || 0) ;
        acc.hidrats += (dieta.aliment?.hidrats || 0);
        acc.greixos += (dieta.aliment?.greixos || 0);
        return acc;
    }, { calories: 0, proteines: 0, hidrats: 0, greixos: 0 });

    return (
        <div className="dieta-pagina">
            <div className="dieta-quadrat">
                <h2>Dieta del dia</h2>
                <input
                    type="date"
                    value={dataSeleccionada}
                    onChange={handleDataChange}
                    className="selector-data"
                />
                <button onClick={carregarDietes} className="carregar-btn">
                    Carregar aliments
                </button>

                {dietes.length > 0 ? (
                    <>
                        <ul className="llista-aliments">
                            {dietes.map((dieta, idx) => (
                                <li key={dieta.id || idx}>
                                    <strong>{dieta.aliment?.nom}</strong> — {dieta.quantitat} grams ·
                                    {" "}{(dieta.aliment?.calories || 0) } kcal
                                </li>
                            ))}
                        </ul>
                        <div className="totals-nutrients">
                            <p><strong>Total calories:</strong> {totals.calories.toFixed(2)} kcal</p>
                            <p><strong>Proteïnes:</strong> {totals.proteines.toFixed(2)} g</p>
                            <p><strong>Hidrats de carboni:</strong> {totals.hidrats.toFixed(2)} g</p>
                            <p><strong>Greixos:</strong> {totals.greixos.toFixed(2)} g</p>
                        </div>
                    </>
                ) : (
                    <p className="cap-aliment">No s'han trobat aliments per a aquesta data.</p>
                )}

                <button onClick={handleAfegir} className="afegir-btn">
                    Afegir aliment
                </button>
            </div>
        </div>
    );
};

export default Dieta;
