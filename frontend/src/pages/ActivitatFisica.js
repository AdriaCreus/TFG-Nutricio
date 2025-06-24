import React, { useEffect, useState } from 'react';
import '../styles/activitatFisica.css';
import { useNavigate } from 'react-router-dom';

const ActivitatFisica = () => {
    const [dataSeleccionada, setDataSeleccionada] = useState('');
    const [entrenaments, setEntrenaments] = useState([]);
    const [usuariId, setUsuariId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const usuari = JSON.parse(localStorage.getItem('usuari'));
        if (usuari) {
            setUsuariId(usuari.id);
        }
    }, []);

    const carregarEntrenaments = async () => {
        if (!dataSeleccionada || !usuariId) return;

        try {
            const resposta = await fetch(`http://localhost:8080/api/entrenaments/data?data=${dataSeleccionada}&usuariId=${usuariId}`);
            const dades = await resposta.json();
            setEntrenaments(Array.isArray(dades) ? dades : []);
        } catch (error) {
            console.error('Error carregant entrenaments:', error);
            setEntrenaments([]);
        }
    };

    const handleDataChange = (e) => {
        setDataSeleccionada(e.target.value);
    };

    const handleAfegir = () => {
        navigate('/afegir-entrenament');
    };
    const caloriesTotals = entrenaments.reduce((acc, entrenament) => {
        const caloriesEntrenament = entrenament.activitats?.reduce((sum, act) => sum + (act.calories || 0), 0) || 0;
        return acc + caloriesEntrenament;
    }, 0);

    return (
        <div className="activitat-pagina">
            <div className="entrenament-quadrat">
                <h2>Entrenament del dia</h2>
                <input
                    type="date"
                    value={dataSeleccionada}
                    onChange={handleDataChange}
                    className="selector-data"
                />
                <button onClick={carregarEntrenaments} className="carregar-btn">
                    Carregar activitats
                </button>

                {entrenaments.length > 0 ? (
                    <>
                        <ul className="llista-activitats">
                            {entrenaments.map((entrenament, idx) => (
                                <li key={entrenament.id || idx}>
                                    <strong>Entrenament</strong> — {entrenament.duracio} min
                                    <ul>
                                        {entrenament.activitats?.map((act) => (
                                            <li key={act.id}>
                                                Activitat: <strong>{act.nom}</strong> · {act.calories} kcal
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        <div className="calories-totals">
                            <strong>Total de calories cremades:</strong> {caloriesTotals.toFixed(2)} kcal
                        </div>
                    </>
                ) : (
                    <p className="cap-activitat">No s'han trobat activitats per a aquesta data.</p>
                )}

                <button onClick={handleAfegir} className="afegir-btn">
                    Afegir activitat
                </button>
            </div>
        </div>
    );
};

export default ActivitatFisica;
