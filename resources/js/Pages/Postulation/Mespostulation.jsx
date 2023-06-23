import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import {Control, Field, Form, Label, Message} from '@radix-ui/react-form';

export default function MesPostulation({auth}) {
    const [postulations, setPostulations] = React.useState([]);
    const [selectedPostulation, setSelectedPostulation] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [editPostulation, setEditPostulation] = React.useState([]);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('api/postulation_user/select', {
                params: {
                    user_id: auth.user.id
                }
            });
            setPostulations(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (postulation) => {
        console.log('Editing postulation:', postulation);
        try {
            const response = await axios.get('api/postulation_user/select', {
                params: {
                    user_id: auth.user.id,
                    postulation_id: postulation
                }
            });
            setEditPostulation(response.data);
            setOpenEditDialog(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (postulation) => {
        try {
            console.log(postulation);
            await axios.post('api/postulation_user/delete', null, {
                params: {
                    postulation_id: postulation
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseEditDialog = () => {
        setSelectedPostulation(null);
        setOpenEditDialog(false);
        console.log('SAVED');
    };

    const handleSaveEditDialog = async (event, postulationId) => {
        setSelectedPostulation(null);
        setOpenEditDialog(false);
        const formData = new FormData(event.currentTarget);
        const update = [formData.get('nom'), formData.get('prenom'), formData.get('mail')]
        console.log(update)
        try {
            const response = await axios.post('api/postulation_user/save', null, {
                params: {
                    postulation_id: postulationId,
                    name: formData.get('nom'),
                    prenom: formData.get('prenom'),
                    mail: formData.get('mail')
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenDialog = (postulation) => {
        setSelectedPostulation(postulation);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedPostulation(null);
        setOpenDialog(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"> Mes Postulations</h2>}
        >
            <Head title="Mes postulations"/>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Postulation</TableCell>
                            <TableCell align="right">Apprentissage</TableCell>
                            <TableCell align="right">Date d'envoi</TableCell>
                            <TableCell align="right">Avancement</TableCell>
                            <TableCell align="right">Dernière mise à jour</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {postulations.map((postulation, index) => (
                            <TableRow key={postulation.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{postulation.apprentissage}</TableCell>
                                <TableCell align="right">{postulation.created_at}</TableCell>
                                <TableCell align="right">{postulation.avancement_postulation}</TableCell>
                                <TableCell align="right">{postulation.updated_at}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" onClick={() => handleEdit(postulation.id)}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" onClick={() => handleDelete(postulation.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="xl">
                <DialogTitle>Edit Postulation</DialogTitle>
                <DialogContent>
                    {editPostulation.map((postulation) => (
                        <Form
                            key={postulation.id}
                            className="FormRoot"
                            onSubmit={(event) => handleSaveEditDialog(event, postulation.id)}
                        >
                            <Field className="FormField">
                                <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                                    <Label className="FormLabel" htmlFor="nom">
                                        Nom
                                    </Label>
                                    <Message className="FormMessage" match="valueMissing">
                                        Entrez votre nom
                                    </Message>
                                </div>
                                <Control asChild>
                                    <input className="Input" type="text" defaultValue={postulation.nom} name="nom"
                                           id="nom"/>
                                </Control>
                            </Field>
                            <Field className="FormField">
                                <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                                    <Label className="FormLabel" htmlFor="prenom">
                                        Prénom
                                    </Label>
                                    <Message className="FormMessage" match="valueMissing">
                                        Entrez votre prénom
                                    </Message>
                                </div>
                                <Control asChild>
                                    <input className="Input" type="text" defaultValue={postulation.prenom} name="prenom"
                                           id="prenom"/>
                                </Control>
                            </Field>
                            <Field className="FormField">
                                <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                                    <Label className="FormLabel" htmlFor="mail">
                                        Mail
                                    </Label>
                                    <Message className="FormMessage" match="valueMissing">
                                        Entrez une adresse mail valide
                                    </Message>
                                </div>
                                <Control asChild>
                                    <input className="Input" type="email" defaultValue={postulation.mail} name="mail"
                                           id="mail"/>
                                </Control>
                            </Field>
                            <button type="submit">Save</button>
                        </Form>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </AuthenticatedLayout>
    );
}
