import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import React from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';

export default function MesPostulation({auth}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Ajoutez ici votre logique de soumission du formulaire
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mes Préavis</h2>}
        >
            <Head title="Mes Préavis"/>
            <h1>hello world</h1>
            <form className="FormRoot" action="/" method="post" onSubmit={handleSubmit}>
                <FormControl required fullWidth>
                    <InputLabel id="valid-postulation-label">Valider la postulation</InputLabel>
                    <Select
                        labelId="valid-postulation-label"
                        id="valid-postulation"
                        name="validPostulation"
                        className="Input"
                        required
                    >
                        <MenuItem value="" disabled>
                            Veuillez choisir
                        </MenuItem>
                        <MenuItem value="Apte">Apte</MenuItem>
                        <MenuItem value="Inapte">Inapte</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    className="FormField"
                    name="Nom"
                    label="Explication de votre choix"
                    multiline
                    rows={6}
                    required
                    fullWidth
                />

                <Button type="submit" variant="contained" color="primary" style={{marginTop: 10}}>
                    Envoyer la postulation
                </Button>
            </form>
        </AuthenticatedLayout>
    );
}
