import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <Navbar />
            <Box p={{ xs: 8, sm: 6, md: 9 }} height='80vh' width='80vh' m="auto">
                <Box pb={5}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        rowSpacing={1}
                        alignItems="center"
                    >
                        <Box pt={5} pb={1} textAlign="center">
                            <Typography variant="h3">
                                Bem-vindo ao SNELF!
                            </Typography>
                        </Box>

                        <Box p={2} pb={14} textAlign="center">
                            <Typography variant="h8">
                            O SNELF é uma ferramenta para identificação disparidades em preços praticados em compras públicas.
                            </Typography>
                        </Box>

                        <Grid item>
                            <Button component={Link} to="/importacao" variant="contained">
                                Iniciar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}
