import * as React from 'react';
import { Alert, Box, Button, Grid, Paper, Typography } from '@mui/material';
import UploadFileIcon from "@mui/icons-material/UploadFile";

const IMPORTACAO_ENDPOINT = `http://127.0.0.1:8000/importacaoCsv`;

export default function ImportacaoForm() {
    const [csvFile, setCsvFile] = React.useState();
    const [filename, setFilename] = React.useState("");
    const [resultMessage, setResultMessage] = React.useState();

    const handleChange = (e) => {
        if (e.target.files.length) {
            setCsvFile(e.target.files[0]);
            setFilename(e.target.files[0].name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("csvFile", csvFile);
        await fetch(IMPORTACAO_ENDPOINT, {
            method: "POST",
            body: formData,
        })
        .then(r => r.json().then(data => ({ status: r.status, body: data })))
        .then(obj => {
            console.log(obj);
            if(obj.status===200){
                setResultMessage(<Alert variant='filled' severity='success' onClose={() => {setResultMessage()}}>CSV Importado com sucesso</Alert>);
            }else{
                setResultMessage(<Alert variant='filled' severity='error' onClose={() => {setResultMessage()}}>Ocorreu um erro na importação do CSV. Código {obj.status}</Alert>);
            }
        });
    };
    
    return (
        <Box p={{ xs: 8, sm: 6, md: 6 }} height='80vh' width='60vh' m="auto">
            {resultMessage}
            <Paper elevation={5}>
                <Box pb={5} m={5}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        rowSpacing={1}
                        alignItems="center"
                    >
                        <Box pt={5} pb={1} textAlign="center">
                            <Typography variant="h4">
                                Importar Base de Dados
                            </Typography>
                        </Box>

                        <Box p={2} pb={14} textAlign="center">
                            <Typography variant="h8">
                                Importe aqui o arquivo CSV contendo a base de dados à ser utilizada para o treinamento do modelo de inferência.
                            </Typography>
                        </Box>

                        <Grid item>
                            <Typography variant='h5'>
                                {filename}
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Button component="label" variant="contained" startIcon={<UploadFileIcon />}>
                                Upload CSV
                                <input type="file" accept=".csv" onChange={handleChange} hidden />
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button component="label" variant="contained" type="submit" onClick={handleSubmit}>
                                Importar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}
