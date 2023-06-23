import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {LinearProgress} from '@mui/material';

export default function Recap({auth}) {
    const [numPostulations, setNumPostulations] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        getUserRole();

        // Permet de récupérer les postulations des utilisateurs via l'ID de l'utilisateur
        async function fetchNumPostulations() {
            try {
                const response = await axios.get('/api/user/postulations/count', {
                    params: {
                        user_id: auth.user.id // Remplacez "auth.user.id" par la variable contenant l'ID de l'utilisateur
                    }
                });
                const {numPostulations} = response.data;
                setNumPostulations(numPostulations);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de postulations', error);
            }
        }

        if (userRole !== 4 || userRole !== 2) {
            fetchNumPostulations();
        }
    }, []);

    const getUserRole = async () => {
        try {
            const response = await axios.get('api/user_role/select', {
                params: {
                    user_id: auth.user.id,
                }
            });
            console.log(response.data[0].role_id);
            setUserRole(response.data[0].role_id);
        } catch (error) {
            console.error(error);
        }
    };

    if (numPostulations === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {userRole === 2 || userRole === 4 ? (
                <h1>Bonjour {auth.user.name}!</h1>
            ) : (
                <div>
                    Numéro de postulation : {numPostulations}
                    État de votre postulation:
                    <LinearProgress variant="determinate" value={10}/>
                </div>
            )}
        </div>
    );
}
