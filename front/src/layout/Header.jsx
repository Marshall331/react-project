import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import ThemeSwitch from '@/components/Theme/ThemeSwitch';
import logo from '@/assets/images/main_logo.svg';
import { useAuth } from '@/hooks/useAuth';
import Divider from '@mui/material/Divider';

const pages = [
    { name: 'Solo', path: '/solo' },
    { name: 'Multijoueur', path: '/multiplayer' },
]

const settings = [
    { name: 'Mon compte', path: '/account' },
    { name: 'Utilisateurs', path: '/admin/users' },
]

function Header() {
    const { user, logout } = useAuth();

    const avatarText = user ? user.firstname[0] + user.lastname[0] : "";

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="false">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={logo} className="App-logo" height="65px" alt="logo" />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography component={Link} to={page.path} sx={{ textAlign: 'center', color: 'inherit', textDecoration: 'none' }}>
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img
                            src={logo}
                            className="rounded-circle mt-2 mb-2"
                            height="80px"
                            alt="Main Logo"
                        />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                component={Link}
                                to={page.path}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 5,
                                    mr: 3,
                                    color: 'white',
                                    display: 'block',
                                    fontSize: '1.2rem',
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Mon profil">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                                <Avatar sx={{ width: 65, height: 65 }}
                                >{avatarText}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '82.5px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ color: 'inherit', textAlign: 'center', textDecoration: 'none', width: '100%', paddingLeft: '1em', paddingRight: '1em' }} component={Link} to={page.path}>
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}

                            <Divider />

                            <ThemeSwitch />

                            <Divider />

                            <MenuItem onClick={logout} sx={{ color: 'red' }}>
                                <Typography textAlign={'center'} width={'100%'}>
                                    Se déconnecter
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;