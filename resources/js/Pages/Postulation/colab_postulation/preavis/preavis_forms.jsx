import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import React, {useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import axios from "axios";

export default function MesPostulation({auth}) {
    const [formData, setFormData] = useState({
        validPostulation: '',
        explication: '',
    });

    const handleSubmit = async (event) => {
        const {validPostulation, explication} = formData;
        try {
            await axios.post('api/colaborateur/preavis_form/send');
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mes Préavis</h2>}
        >
            <Head title="Mes Préavis"/>
            <h1>hello world</h1>
            <div style={{marginTop: '2rem'}}>
                <form className="FormRoot" action="/postulation_preavis" method="get" onSubmit={handleSubmit}>
                    <FormControl required fullWidth>
                        <InputLabel id="valid-postulation-label">Valider la postulation</InputLabel>
                        <Select
                            labelId="valid-postulation-label"
                            id="valid-postulation"
                            name="validPostulation"
                            className="Input"
                            style={{zIndex: 1}} // Ajout de la propriété zIndex
                            required
                            value={formData.validPostulation}
                            onChange={handleChange}
                        >
                            <MenuItem value="" disabled>
                                Veuillez choisir
                            </MenuItem>
                            <MenuItem value="Apte">Apte</MenuItem>
                            <MenuItem value="Inapte">Inapte</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{marginTop: '1rem'}}>
                        <TextField
                            className="FormField"
                            name="explication"
                            label="Explication de votre choix"
                            multiline
                            rows={6}
                            required
                            fullWidth
                            value={formData.explication}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary" style={{marginTop: '1rem'}}>
                        Envoyer le préavis
                    </Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
