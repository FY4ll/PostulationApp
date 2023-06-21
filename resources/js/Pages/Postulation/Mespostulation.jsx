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
import * as Form from '@radix-ui/react-form';

export default function Mespostulation({auth}) {
    const [postulations, setPostulations] = React.useState([]);
    const [selectedPostulation, setSelectedPostulation] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [editPostulation, setEditPostulation] = React.useState([])


    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('api/test_api', {
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
        // Handle edit logic here
        console.log('Editing postulation:', postulation);
        try {
            const response = await axios.get('api/test_api', {
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

    const handleDelete = (postulation) => {
        // Handle delete logic here
        console.log('Deleting postulation:', postulation);
    };
    const handleCloseEditDialog = () => {
        setSelectedPostulation(null);
        setOpenEditDialog(false);
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight"> Mes Postulation</h2>}
        >
            <Head title="Mes postuations"/>
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
                                    <Button variant="outlined" onClick={() => handleOpenDialog(postulation)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Delete Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this postulation?
                    {/* Add additional details about the postulation here if needed */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button color="error" onClick={() => handleDelete(selectedPostulation)}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="xl">
                <DialogTitle>Edit Postulation</DialogTitle>
                <DialogContent>
                    {editPostulation.map((postulation) => (
                        <Form.Root
                            className="FormRoot"
                            action="/postulation"
                            method="post"
                        >
                            <Form.Field className="FormField" name="Nom">
                                <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                                    <Form.Label className="FormLabel">Nom</Form.Label>
                                    <Form.Message className="FormMessage" match="valueMissing">
                                        Entrez votre nom
                                    </Form.Message>
                                </div>
                                <Form.Control asChild>
                                    <input className="Input" type="text" defaultValue={postulation.nom}/>
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
                                    <input className="Input" type="text" defaultValue={postulation.prenom}/>
                                </Form.Control>
                            </Form.Field>
                            <Form.Field className="FormField" name="Mail">
                                <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                                    <Form.Label className="FormLabel">Mail</Form.Label>
                                    <Form.Message className="FormMessage" match="valueMissing">
                                        Entrez une adresse mail valide
                                    </Form.Message>
                                </div>
                                <Form.Control asChild>
                                    <input className="Input" type="email" defaultValue={postulation.mail}/>
                                </Form.Control>
                            </Form.Field>
                            <Form.Field name="Dropdown">
                                <Form.Label className="FormLabel">Apprentissage</Form.Label>
                                <Form.Message className="FormMessage" match="valueMissing">
                                    Veuillez sélectionner un apprentissage
                                </Form.Message>
                                <Form.Control asChild>
                                    <select name="Apprentissage" id="job" className="Input"
                                            defaultValue={postulation.apprentissage}>
                                        <option value="" disabled hidden>Veuillez choisir</option>
                                        <option value="Informaticien">Informaticien (développement)</option>
                                        <option value="Employer de commerce">Employer de commerce</option>
                                    </select>
                                </Form.Control>
                            </Form.Field>
                        </Form.Root>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </AuthenticatedLayout>
    );
}
