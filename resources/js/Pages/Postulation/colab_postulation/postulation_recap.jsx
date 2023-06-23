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

export default function MesPostulation({auth}) {
    const [postulations, setPostulations] = React.useState([]);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('api/postulation_user/select/colaborateur');
            setPostulations(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDialog = () => {
        setDialogOpen(!dialogOpen);
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
                            <TableCell align="right">Nom Postulant</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Préavis</TableCell>
                            <TableCell align="right">Date de postulation</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {postulations.map((postulation, index) => (
                            <TableRow key={postulation.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{postulation.nom}</TableCell>
                                <TableCell align="right">{postulation.avancement_postulation}</TableCell>
                                <TableCell align="right">{postulation.situation}</TableCell>
                                <TableCell align="right">{postulation.created_at}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" onClick={handleDialog}>
                                        ...
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={dialogOpen} onClose={handleDialog} maxWidth="xl">
                <DialogTitle>Action</DialogTitle>
                <DialogContent>
                    <Button variant="outlined">Télécharger les fichiiers</Button>
                    <Button variant="outlined">donner son préavis</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </AuthenticatedLayout>
    );
}
