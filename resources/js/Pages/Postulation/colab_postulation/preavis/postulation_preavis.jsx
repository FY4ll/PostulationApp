import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {saveAs} from 'file-saver';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';

export default function MesPostulation({auth}) {
    const [postulations, setPostulations] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [postNum, setPostNum] = useState(null);
    const [postid, setPostid] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('api/postulation_user/select/colaborateur');
            setPostulations(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDialog = (num) => {
        setPostNum(num);
        setPostid(postulations[postNum].id)
        setDialogOpen(!dialogOpen);


    };

    const handleDownload = async () => {
        console.log(postulations[postNum].cv_path)
        try {
            const nomsFichiers = [postulations[postNum].cv_path, postulations[postNum].motivation_path, postulations[postNum].video_path];
            for (const nomFichier of nomsFichiers) {
                const response = await axios.get(`api/postulation/download/colaborateur`, {
                    responseType: 'blob',
                    params: {
                        filename: nomFichier
                    }
                });

                saveAs(new Blob([response.data]), nomFichier);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mes Préavis</h2>}
        >
            <Head title="Mes Préavis"/>
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
                                <TableCell align="right">{postulation.preavis}</TableCell>
                                <TableCell align="right">{postulation.created_at}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" onClick={() => handleDialog(index)}>
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
                    <Button variant="outlined" onClick={handleDownload}>Télécharger les fichiers</Button>
                    <Button variant="outlined" href={route('postulation_preavis/forms', {id: postid})}>
                        Donner son préavis
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </AuthenticatedLayout>
    );
}
