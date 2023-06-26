import {useEffect, useState} from 'react';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField
} from '@mui/material';
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios';

import './style.css';

export default function Postulation({user}) {
    const {handleSubmit, control} = useForm();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [user]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('id', user.id);

        for (const key in data) {
            formData.append(key, data[key]);
        }

        try {
            await axios.post('api/postulation', formData);
            console.log('Postulation soumise avec succès');
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Erreur lors de la soumission de la postulation', error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <form className="FormRoot" onSubmit={handleSubmit(onSubmit)} action="/postulation" method="post">
            <Controller
                name="Nom"
                control={control}
                defaultValue=""
                rules={{required: true}}
                render={({field}) => (
                    <FormControl className="FormField" fullWidth>
                        <FormLabel>Nom</FormLabel>
                        <TextField {...field} required/>
                    </FormControl>
                )}
            />

            <Controller
                name="Prenom"
                control={control}
                defaultValue=""
                rules={{required: true}}
                render={({field}) => (
                    <FormControl className="FormField" fullWidth>
                        <FormLabel>Prénom</FormLabel>
                        <TextField {...field} required/>
                    </FormControl>
                )}
            />

            <Controller
                name="Mail"
                control={control}
                defaultValue=""
                rules={{required: true, pattern: /^\S+@\S+$/i}}
                render={({field}) => (
                    <FormControl className="FormField" fullWidth>
                        <FormLabel>Mail</FormLabel>
                        <TextField {...field} type="email" required/>
                    </FormControl>
                )}
            />

            <Controller
                name="Dropdown"
                control={control}
                defaultValue=""
                rules={{required: true}}
                render={({field}) => (
                    <FormControl className="FormField" fullWidth>
                        <FormLabel>Apprentissage</FormLabel>
                        <Select {...field} required>
                            <MenuItem value="" disabled>
                                Veuillez choisir
                            </MenuItem>
                            <MenuItem value="Informaticien">Informaticien (développement)</MenuItem>
                            <MenuItem value="Employer de commerce">Employer de commerce</MenuItem>
                        </Select>
                    </FormControl>
                )}
            />

            <Controller
                name="Radio"
                control={control}
                defaultValue=""
                rules={{required: true}}
                render={({field}) => (
                    <FormControl className="FormField" fullWidth>
                        <FormLabel>Emploi Actuel</FormLabel>
                        <RadioGroup {...field}>
                            <FormControlLabel value="etudiant" control={<Radio/>} label="Étudiant"/>
                            <FormControlLabel value="Employe" control={<Radio/>} label="Employé"/>
                            <FormControlLabel value="Independant" control={<Radio/>} label="Indépendant"/>
                            <FormControlLabel value="sans-emploi" control={<Radio/>} label="Sans emploi"/>
                        </RadioGroup>
                    </FormControl>
                )}
            />

            <Controller
                name="file1"
                control={control}
                defaultValue=""
                rules={{required: true}}
                render={({field}) => (
                    <FormControl className="FormField">
                        <FormLabel>CV</FormLabel>
                        <input {...field} type="file" accept=".pdf" required/>
                    </FormControl>
                )}
            />

            <Controller
                name="file2"
                control={control}
                defaultValue=""
                rules={{required: true}}
                render={({field}) => (
                    <FormControl className="FormField">
                        <FormLabel>Lettre de motivation</FormLabel>
                        <input {...field} type="file" accept=".pdf" required/>
                    </FormControl>
                )}
            />

            <Controller
                name="file3"
                control={control}
                defaultValue=""
                rules={{required: true}}
                render={({field}) => (
                    <FormControl className="FormField">
                        <FormLabel>Video de motivation</FormLabel>
                        <input {...field} type="file" accept="video/*" required/>
                    </FormControl>
                )}
            />

            <Button type="submit" variant="contained" color="primary" style={{marginTop: 10}}>
                Envoyer la postulation
            </Button>
        </form>
    );
}
