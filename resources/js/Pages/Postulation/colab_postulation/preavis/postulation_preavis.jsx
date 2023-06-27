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
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';

export default function MesPostulation({auth}) {
    const [formData, setFormData] = useState({
        validPostulation: '',
        explication: '',
    });
    const [postulations, setPostulations] = useState([]);
    const [dialogOpenAction, setDialogOpenAction] = useState(false);
    const [dialogOpenPreavis, setDialogOpenPreavis] = useState(false);
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

    const handleDialogAction = (num) => {
        setPostNum(num);
        setPostid(postulations[postNum].id)
        setDialogOpenAction(!dialogOpenAction);


    };
    const handleDialogPreavForm = () => {
        setDialogOpenPreavis(!dialogOpenPreavis);
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
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmit = async (event) => {
        handleDialogPreavForm()
        const {validPostulation, explication} = formData;
        console.log("hello world")
        try {
            await axios.post('api/colaborateur/preavis_form/send');
        } catch (error) {
            console.error(error);
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
                                    <Button variant="outlined" onClick={() => handleDialogAction(index)}>
                                        ...
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={dialogOpenAction} onClose={handleDialogAction} maxWidth="xl">
                <DialogTitle>Action</DialogTitle>
                <DialogContent>
                    <Button variant="outlined" onClick={handleDownload}>Télécharger les fichiers</Button>
                    <Button variant="outlined" onClick={handleDialogPreavForm}>
                        Donner son préavis
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogAction}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={dialogOpenPreavis} onClose={handleDialogPreavForm} maxWidth="xl">
                <DialogTitle>Donner son préavis</DialogTitle>
                <DialogContent>
                    <FormControl required fullWidth>
                        <InputLabel id="valid-postulation-label">Valider la postulation</InputLabel>
                        <Select
                            labelId="valid-postulation-label"
                            id="valid-postulation"
                            name="validPostulation"
                            className="Input"
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Envoyer le préavis
                    </Button>
                </DialogActions>
            </Dialog>
        </AuthenticatedLayout>
    );
}
