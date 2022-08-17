import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Link } from 'react-router-dom';

export default function Sobre() {
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
                                Sobre o Projeto
                            </Typography>
                        </Box>

                        <Box p={2} pb={2} textAlign="center">
                            <Typography variant="h8">
                            O SNELF é uma plataforma para detecção de disparidades de preços em compras públicas. O objetivo é auxiliar na auditoria de notas fiscais relacionadas a compras, e verificar possíveis fraudes.
                            </Typography>
                        </Box>

                        <Box p={2} pb={2} textAlign="center">
                            <Typography variant="h8">
                            Desenvolvido pelos alunos Filipe Shanom Xavier e Pedro Joaquim
                            </Typography>
                        </Box>

                        <Grid item>
                            <Button component={Link} to="/" variant="contained">
                                Voltar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}
