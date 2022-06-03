import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import InfoIcon from '@mui/icons-material/Info';
import './Navbar.css'
import { Link } from 'react-router-dom';

export default function BotaoMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>

      <MenuIcon
        onClick={handleClick}
        size="small"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component={Link} to={'/importacao'} onClick={handleClose}><ImportExportIcon className='iconeMenu' />Importar Base de Dados</MenuItem>
        <MenuItem component={Link} to={'/busca'} onClick={handleClose}><SearchIcon className='iconeMenu' />Buscar Produtos</MenuItem>
        <MenuItem component={Link} to={'/sobre'} onClick={handleClose}><InfoIcon className='iconeMenu' />Sobre o Projeto</MenuItem>


      </Menu>

    </div>
  );
}
