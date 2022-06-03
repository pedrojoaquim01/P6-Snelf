import * as React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function ImportacaoForm() {
    const [csvFile, setCsvFile] = React.useState();
    const [filename, setFilename] = React.useState("");

    const handleChange = (e) => {
        if (e.target.files.length) {
            // If input type is correct set the state
            setCsvFile(e.target.files[0]);
            setFilename(e.target.files[0].name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(csvFile);
    };

    return (
        <Box p={{ xs: 10, sm: 6, md: 10 }}>
            <Paper elevation={4}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    rowSpacing={1}
                    alignItems="center"
                    style={{ minHeight: '80vh' }}
                >
                    <Box py={14}>
                        <Typography variant="h4">
                            Importar DataSet
                        </Typography>
                    </Box>

                    <Grid item>
                        <Button component="label" variant="contained" startIcon={<UploadFileIcon />}>
                            Upload CSV
                            <input type="file" accept=".csv" onChange={handleChange} hidden />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography variant='h5'>
                            {filename}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button component="label" variant="contained" type="submit" onClick={handleSubmit}>
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
