import React, { useState } from 'react';
import './styles.css';
import { useHistory } from 'react-router-dom';
import api from '../../Services/api';

import logoImg from '../../assets/logo.png';
import heroesImg from '../../assets/heroes.png';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ministrieId', id);
            localStorage.setItem('ministrieName', response.data.name);

            history.push('/profile');
        } catch (e) {
            alert('Falha no login, tente novamente.');
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Nossa lirio"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}