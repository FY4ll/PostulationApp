import {useEffect, useState} from 'react';
import * as Form from '@radix-ui/react-form';
import {Label} from '@radix-ui/react-form';
import axios from 'axios';

import './style.css';

export default function Postulation({user}) {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        if (user) {
            // Mettre à jour les données de l'utilisateur lorsqu'il est disponible
            setUserData(user);
        }
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append('id', user.id);
        try {
            await axios.post('api/postulation', formData);
            console.log('Postulation soumise avec succès');
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Erreur lors de la soumission de la postulation', error);
        }
    };

    if (!userData) {
        // Afficher un message de chargement ou effectuer une autre action si les données de l'utilisateur ne sont pas encore disponibles
        return <div>Loading...</div>;
    }

    // Utiliser les informations de l'utilisateur


    return (
        <Form.Root className="FormRoot" onSubmit={handleSubmit} action="/postulation" method="post">
            <Form.Field className="FormField" name="Nom">
                <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                    <Form.Label className="FormLabel">Nom</Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                        Entrez votre nom
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input className="Input" type="text" required/>
                </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="Prenom">
                <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                    <Form.Label className="FormLabel">Prénom</Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                        Entrez votre Prénom
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input className="Input" type="text" required/>
                </Form.Control>
            </Form.Field>
            <Form.Field className="FormField" name="Mail">
                <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                    <Form.Label className="FormLabel">Mail</Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                        Entrez Une adresse mail valide
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input className="Input" type="email" required/>
                </Form.Control>
            </Form.Field>


            <Form.Field name="Dropdown">
                <Label className="FormLabel">Apprentissage</Label>
                <Form.Message className="FormMessage" match="valueMissing">
                    Veuillez sélectionner un apprentissage
                </Form.Message>
                <Form.Control asChild>
                    <select name="Apprentissage" id="job" className="Input" required>
                        <option value="" disabled selected hidden>Veuillez choisir</option>
                        <option value="Informaticien">Informaticien (développement)</option>
                        <option value="Employer de commerce">Employer de commerce</option>
                    </select>
                </Form.Control>
            </Form.Field>
            <Form.Field name="Radio">
                <Label className="FormLabel">Emploi Actuel</Label>
                <Form.Message className="FormMessage" match="valueMissing">
                    Veuillez sélectionner un statut
                </Form.Message>
                <Form.Control asChild>
                    <div className="radio-group">
                        <label htmlFor="option1" className="radio-label">Étudiant</label>
                        <input type="radio" id="option1" name="situation" value="etudiant" className="radio-input"/>
                        <label htmlFor="option2" className="radio-label">Employé</label>
                        <input type="radio" id="option2" name="situation" value="Employe" className="radio-input"/>
                        <label htmlFor="option3" className="radio-label">Indépendant</label>
                        <input type="radio" id="option3" name="situation" value="Independant" className="radio-input"/>
                        <label htmlFor="option4" className="radio-label">Sans emploi</label>
                        <input type="radio" id="option4" name="situation" value="sans-emploi" className="radio-input"/>
                    </div>
                </Form.Control>
            </Form.Field>
            {/* Barre de téléchargement de fichier 1 */}
            <Form.Field className="FormField" name="file1">
                <div>
                    <Form.Label className="FormLabel">CV</Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                        Format PDF uniquement
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input className="Input" type="file" accept=".pdf" required/>
                </Form.Control>
            </Form.Field>

            {/* Barre de téléchargement de fichier 2 */}
            <Form.Field className="FormField" name="file2">
                <div>
                    <Form.Label className="FormLabel">Lettre de motivation</Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                        Format PDF uniquement
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input className="Input" type="file" accept=".pdf" required/>
                </Form.Control>
            </Form.Field>

            {/* Barre de téléchargement de fichier 3 */}
            <Form.Field className="FormField" name="file3">
                <div>
                    <Form.Label className="FormLabel">Video de motivation</Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                        Format video uniquement
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input className="Input" type="file" accept="video/*" required/>
                </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
                <button className="Button" style={{marginTop: 10}}>
                    Envoyer la postulation
                </button>
            </Form.Submit>
        </Form.Root>
    );
}
