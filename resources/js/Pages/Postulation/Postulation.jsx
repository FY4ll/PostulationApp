import React from 'react';
import * as Form from '@radix-ui/react-form';
import {Label} from '@radix-ui/react-form';
import './style.css';

export default function Postulation() {
    return (
        <Form.Root className="FormRoot">
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
            <Form.Field className="FormField" name="Prénom">
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
