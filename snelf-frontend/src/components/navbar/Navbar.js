import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BotaoMenu from './BotaoMenu';
import { Link } from 'react-router-dom';
import "./Navbar.css"

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <BotaoMenu />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Link to="/" className='text-link'>
                            SNELF
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
