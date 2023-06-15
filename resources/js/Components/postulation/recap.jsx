import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {LinearProgress} from "@mui/material";

export default function Recap({auth}) {
    const [numPostulations, setNumPostulations] = useState(null);

    useEffect(() => {
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

        fetchNumPostulations();
    }, []);

    if (numPostulations === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            Numéro de postulation : {numPostulations}
            État de votre postulation:
            <LinearProgress variant="determinate" value={10}/>
        </div>


    );
}
