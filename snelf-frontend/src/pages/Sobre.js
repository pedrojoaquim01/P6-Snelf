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
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            </Typography>
                        </Box>

                        <Box p={2} pb={2} textAlign="center">
                            <Typography variant="h8">
                            Desenvolvido pelos alunos Filipe Shanom Xavier, Pedro Joaquim e João Pedro Maues
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
