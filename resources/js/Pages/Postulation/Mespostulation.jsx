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

export default function Mespostulation({auth}) {
    const [data, setData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedPostulation, setSelectedPostulation] = React.useState(null);

    const handleEdit = (postulation) => {
        setSelectedPostulation(postulation);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedPostulation(null);
        setOpen(false);
    };

    React.useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get('/api/user/postulation/select', {
                    params: {
                        user_id: auth.user.id, // Remplacez "auth.user.id" par la variable contenant l'ID de l'utilisateur
                    },
                });
                const {data} = response;
                setData(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        }

        getData();
    }, []);

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
                            <TableCell align="right">Date d'envoie</TableCell>
                            <TableCell align="right">Avancement</TableCell>
                            <TableCell align="right">Dernière mise à jours</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index} onClick={() => handleEdit(item)} style={{cursor: 'pointer'}}>
                                <TableCell>{index}</TableCell>
                                <TableCell>{item.apprentissage}</TableCell>
                                <TableCell>{item.created_at}</TableCell>
                                <TableCell>{item.avancement_postulation}</TableCell>
                                <TableCell>{item.updated_at}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Postulation</DialogTitle>
                <DialogContent>
                    {/* Contenu du formulaire de modification */}
                    {selectedPostulation && (
                        <form>
                            <h1> hello world</h1>
                        </form>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </AuthenticatedLayout>
    );
}
