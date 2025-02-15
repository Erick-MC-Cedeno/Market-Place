import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    AppBar as MuiAppBar,
    Toolbar,
    Box,
    Typography,
    IconButton,
    Link,
    MenuItem,
    Menu,
    Avatar,
    Tooltip,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    useMediaQuery,
    useTheme,
    Grid,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import {
    ArrowDropDown as ArrowDropDownIcon,
    Menu as MenuIcon,
    ExitToApp as LogoutIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import useAuth from '../hooks/useAuth';
import { AuthContext } from '../hooks/AuthContext';
import useProducts from '../hooks/useProducts';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const navLinksStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
    mx: 2,
    '&:hover': {
        textDecoration: 'underline',
    },
};

const navLinkItemStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
    py: 1,
    px: 2,
};

function DashboardContent() {
    const { auth } = useContext(AuthContext);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { logoutUser } = useAuth();
    const history = useHistory();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { products, loading, error } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState('all'); // Nuevo estado

    const handleCloseUserMenu = () => setAnchorElUser(null);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

    const handleClickUserMenu = async (e) => {
        e.stopPropagation();
        const action = e.target.innerHTML;

        if (action === 'Logout') {
            await logoutUser();
            window.location.reload();
        } else if (action === 'Settings') {
            history.push('/settings');
        }

        setAnchorElUser(null);
        setDrawerOpen(false);
    };

    const handleContactClick = () => {
        alert('¡Se ha hecho clic en Contactar!');
    };

    const getAvatarColor = (name) => {
        const colors = ['#F6851B', '#3C3C3B', '#E8E8E8'];
        const color = colors[name.charCodeAt(0) % colors.length];
        return color;
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    if (!auth) return null;

    const settings = [
        { label: `Hi, ${auth.firstName}`, icon: null },
        { label: 'Settings', icon: <SettingsIcon sx={{ mr: 1 }} /> },
        { label: 'Logout', icon: <LogoutIcon sx={{ mr: 1 }} /> },
    ];

    const navItems = [
        { href: '/create', label: 'Vender productos' },
        { href: '/contactanos', label: 'Contáctanos' },
        { href: '/ubicaciones', label: 'Ubicaciones' },
    ];

    const renderNavLinks = () => (
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {navItems.map(({ href, label }) => (
                <Link
                    key={label}
                    href={href}
                    sx={navLinksStyle}
                >
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>
                        {label}
                    </Typography>
                </Link>
            ))}
        </Box>
    );

    return (
        <>
            <AppBar position="absolute" sx={{ bgcolor: '#4CAF50' }}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: '24px' }}>
                    {isMobile && (
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)} sx={{ position: 'absolute', left: 16 }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', ml: 3 }}>
                        <Link href='/' sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                            <Box
                                sx={{
                                    m: 1,
                                    width: 50,
                                    height: 50,
                                    borderRadius: '50%',
                                    bgcolor: '#4CAF50',
                                    border: '3px solid white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <ArrowDropDownIcon sx={{ color: 'white', fontSize: 30 }} />
                            </Box>
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: 'white', ml: 2 }}>
                                Silk Road
                            </Typography>
                        </Link>
                    </Box>

                    {isMobile ? (
                        <Drawer
                            anchor="left"
                            open={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                            sx={{
                                '& .MuiDrawer-paper': {
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                },
                            }}
                        >
                            <Box
                                sx={{ width: drawerWidth, paddingTop: 8 }}
                                role="presentation"
                                onClick={() => setDrawerOpen(false)}
                                onKeyDown={() => setDrawerOpen(false)}
                            >
                                <List>
                                    {navItems.map(({ href, label }) => (
                                        <ListItem
                                            button
                                            component={Link}
                                            key={label}
                                            href={href}
                                            sx={{ ...navLinkItemStyle, color: 'white' }}
                                            onClick={() => setDrawerOpen(false)}
                                        >
                                            <ListItemText primary={label} sx={{ color: 'white' }} />
                                        </ListItem>
                                    ))}
                                    <Divider />
                                    {settings.map(({ label, icon }) => (
                                        <ListItem
                                            button
                                            key={label}
                                            onClick={handleClickUserMenu}
                                            sx={{ ...navLinkItemStyle, color: 'white' }}
                                        >
                                            {icon}
                                            <ListItemText primary={label} sx={{ color: 'white' }} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Drawer>
                    ) : (
                        renderNavLinks()
                    )}

                    <Box>
                        <Tooltip title="Open settings">
                            <IconButton onClick={(e) => { e.stopPropagation(); handleOpenUserMenu(e); }} sx={{ p: 0 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: getAvatarColor(auth.firstName),
                                        width: 35,
                                        height: 35,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        color: '#fff',
                                    }}
                                >
                                    {auth.firstName.charAt(0)}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map(({ label, icon }) => (
                                <MenuItem key={label} onClick={handleClickUserMenu}>
                                    {icon}
                                    <Typography textAlign="center">{label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ marginTop: 8, padding: 3 }}>
                <Typography variant="h4" sx={{ mb: 3, color: '#4CAF50' }}>
                    Lista de Productos
                </Typography>

                <Box sx={{ display: 'flex', mb: 3 }}>
                    <Button
                        variant={selectedCategory === 'all' ? 'contained' : 'outlined'}
                        onClick={() => handleCategoryChange('all')}
                        sx={{
                            mr: 2,
                            bgcolor: selectedCategory === 'all' ? '#4CAF50' : 'transparent',
                            color: selectedCategory === 'all' ? 'white' : '#4CAF50',
                            '&:hover': {
                                bgcolor: selectedCategory === 'all' ? '#388E3C' : 'rgba(76, 175, 80, 0.1)',
                            },
                        }}
                    >
                        All
                    </Button>
                    <Button
                        variant={selectedCategory === 'electronics' ? 'contained' : 'outlined'}
                        onClick={() => handleCategoryChange('electronics')}
                        sx={{
                            mr: 2,
                            bgcolor: selectedCategory === 'electronics' ? '#4CAF50' : 'transparent',
                            color: selectedCategory === 'electronics' ? 'white' : '#4CAF50',
                            '&:hover': {
                                bgcolor: selectedCategory === 'electronics' ? '#388E3C' : 'rgba(76, 175, 80, 0.1)',
                            },
                        }}
                    >
                        Electronics
                    </Button>
                    <Button
                        variant={selectedCategory === 'clothes' ? 'contained' : 'outlined'}
                        onClick={() => handleCategoryChange('clothes')}
                        sx={{
                            mr: 2,
                            bgcolor: selectedCategory === 'clothes' ? '#4CAF50' : 'transparent',
                            color: selectedCategory === 'clothes' ? 'white' : '#4CAF50',
                            '&:hover': {
                                bgcolor: selectedCategory === 'clothes' ? '#388E3C' : 'rgba(76, 175, 80, 0.1)',
                            },
                        }}
                    >
                        Clothes
                    </Button>
                    <Button
                        variant={selectedCategory === 'vehicles' ? 'contained' : 'outlined'}
                        onClick={() => handleCategoryChange('vehicles')}
                        sx={{
                            bgcolor: selectedCategory === 'vehicles' ? '#4CAF50' : 'transparent',
                            color: selectedCategory === 'vehicles' ? 'white' : '#4CAF50',
                            '&:hover': {
                                bgcolor: selectedCategory === 'vehicles' ? '#388E3C' : 'rgba(76, 175, 80, 0.1)',
                            },
                        }}
                    >
                        Vehicles
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {loading ? (
                            <Typography>Cargando productos...</Typography>
                        ) : error ? (
                            <Typography color="error">Error: {error}</Typography>
                        ) : filteredProducts.length === 0 ? (
                            <Typography>Aún no hay productos.</Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {filteredProducts.map((product, index) => (
                                    <Grid item xs={12} sm={6} md={3} key={index}>
                                        <Box
                                            sx={{
                                                mb: 2,
                                                p: 2,
                                                border: '1px solid #ddd',
                                                borderRadius: 2,
                                                boxSizing: 'border-box',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <Typography variant="h6">{product.name}</Typography>
                                            {product.photo && (
                                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                                    <a href={product.photo} target="_blank" rel="noopener noreferrer">
                                                        <img
                                                            src={product.photo}
                                                            alt={product.name}
                                                            style={{
                                                                width: '100%',
                                                                height: '200px',  
                                                                objectFit: 'cover',  
                                                                borderRadius: 4,
                                                                cursor: 'pointer',
                                                            }}
                                                        />
                                                    </a>
                                                </Box>
                                            )}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                                <Typography variant="body1" sx={{ color: '#4CAF50' }}>
                                                    Creado el: {new Date(product.createdAt).toLocaleDateString() !== 'Invalid Date' ? new Date(product.createdAt).toLocaleDateString() : 'Fecha no válida'}
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        bgcolor: '#4CAF50',
                                                        '&:hover': {
                                                            bgcolor: '#388E3C',
                                                        },
                                                        color: 'white',
                                                        textTransform: 'none',
                                                        fontWeight: 'bold',
                                                    }}
                                                    onClick={handleContactClick}
                                                >
                                                    Contactar
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default DashboardContent;