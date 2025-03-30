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
  TextField,
  InputAdornment,
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
const navLinksStyle = { display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', mx: 2, '&:hover': { textDecoration: 'underline' } };
const navLinkItemStyle = { display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', py: 1, px: 2 };

function DashboardContent() {
  const { auth } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logoutUser } = useAuth();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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
  const handleContactClick = () => alert('¡Se ha hecho clic en Contactar!');
  const getAvatarColor = (name) => { 
    const colors = ['#F6851B', '#3C3C3B', '#E8E8E8'];
    return colors[name.charCodeAt(0) % colors.length];
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); 
  };
  const handleKeywordChange = (e) => setSearchKeyword(e.target.value);
  const handleSearch = () => {
    setSubmittedKeyword(searchKeyword);
    setCurrentPage(1);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);
  const searchFilteredProducts = filteredProducts.filter(product => {
    const key = submittedKeyword.toLowerCase();
    if (!key) return true;
    const name = product.name?.toLowerCase() || '';
    const description = product.description?.toLowerCase() || '';
    return name.includes(key) || description.includes(key);
  });
  const sortedProducts = [...searchFilteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  
  
  const productsPerPage = 12;
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const displayProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

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
        <Link key={label} href={href} sx={navLinksStyle}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>{label}</Typography>
        </Link>
      ))}
    </Box>
  );

  
  const categories = [
    { value: 'all', label: 'All' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothes', label: 'Clothes' },
    { value: 'vehicles', label: 'Vehicles' },
  ];
  
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
              <Box sx={{ m: 1, width: 50, height: 50, borderRadius: '50%', bgcolor: '#4CAF50', border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowDropDownIcon sx={{ color: 'white', fontSize: 30 }} />
              </Box>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: 'white', ml: 2 }}>Silk Road</Typography>
            </Link>
          </Box>
          {isMobile ? (
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#4CAF50', color: 'white' } }}>
              <Box sx={{ width: drawerWidth, paddingTop: 8 }} role="presentation" onClick={() => setDrawerOpen(false)} onKeyDown={() => setDrawerOpen(false)}>
                <List>
                  {navItems.map(({ href, label }) => (
                    <ListItem button component={Link} key={label} href={href} sx={{ ...navLinkItemStyle, color: 'white' }} onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary={label} sx={{ color: 'white' }} />
                    </ListItem>
                  ))}
                  <Divider />
                  {settings.map(({ label, icon }) => (
                    <ListItem button key={label} onClick={handleClickUserMenu} sx={{ ...navLinkItemStyle, color: 'white' }}>
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
                <Avatar sx={{ bgcolor: getAvatarColor(auth.firstName), width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                  {auth.firstName.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu sx={{ mt: '45px' }} anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
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
      <Box sx={{ marginTop: { xs: 2, md: 8 }, padding: { xs: 1, md: 3 } }}>
        <Typography variant="h4" sx={{ mb: 3, color: '#4CAF50' }}>Lista de Productos</Typography>
        <Box sx={{ mb: 4 }}>
          <TextField
            label="Buscar"
            variant="outlined"
            value={searchKeyword}
            onChange={handleKeywordChange}
            sx={{ width: { xs: '100%', md: '40%' }, '& .MuiOutlinedInput-root': { borderRadius: '50px' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" sx={{ borderRadius: '50px', bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' }, paddingX: 2 }} onClick={handleSearch}>
                    Buscar
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', mb: 3 }}>
          {categories.map(({ value, label }, idx) => (
            <Button 
              key={value}
              variant={selectedCategory === value ? 'contained' : 'outlined'}
              onClick={() => handleCategoryChange(value)}
              sx={{ 
                mr: idx !== (categories.length - 1) ? 2 : 0,
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                bgcolor: selectedCategory === value ? '#4CAF50' : 'transparent', 
                color: selectedCategory === value ? 'white' : '#4CAF50', 
                '&:hover': { 
                  bgcolor: selectedCategory === value ? '#388E3C' : 'rgba(76,175,80,0.1)',
                  transform: 'scale(1.05)',
                  boxShadow: '0px 2px 10px rgba(0,0,0,0.2)'
                }
              }}>
              {label}
            </Button>
          ))}
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {loading ? (
              <Typography>Cargando productos...</Typography>
            ) : error ? (
              <Typography color="error">Error: {error}</Typography>
            ) : sortedProducts.length === 0 ? (
              <Typography>Aún no hay productos.</Typography>
            ) : (
              <Grid container spacing={6}>
                {displayProducts.map((product, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box sx={{ 
                      mb: 4, 
                      p: 4, 
                      border: '1px solid #ddd', 
                      borderRadius: 2, 
                      boxSizing: 'border-box', 
                      overflow: 'hidden', 
                      height: 450, 
                      minWidth: 280, 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease', // nueva propiedad
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: '0px 4px 20px rgba(0,0,0,0.2)' } // efecto hover
                    }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {product.name}
                        </Typography>
                        {product.description && (
                          <Typography variant="body2" sx={{ mt: 1, color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                            {product.description}
                          </Typography>
                        )}
                        {product.photo && (
                          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, height: 220, overflow: 'hidden' }}>
                            <img
                              src={product.photo}
                              alt={product.name}
                              style={{
                                width: '100%',
                                height: '220px',
                                objectFit: 'contain', 
                                borderRadius: 4,
                                cursor: 'default'
                              }}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 'bold', 
                            fontSize: '1.2rem',
                            transition: 'transform 0.2s ease',
                            '&:hover': { transform: 'scale(1.1)' }
                          }}>
                          <span style={{ color: 'black' }}>Precio: </span>
                          <span style={{ color: '#4CAF50' }}>${product.price}</span>
                        </Typography>
                        <Button variant="contained" sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' }, color: 'white', textTransform: 'none', fontWeight: 'bold' }} onClick={handleContactClick}>
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
        {/* Controles de paginación */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1} 
            variant="contained"
            sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' }, mr: 2 }}>
            Atras
          </Button>
          {[...Array(totalPages).keys()].map(num => {
            const page = num + 1;
            return (
              <Button 
                key={page} 
                onClick={() => setCurrentPage(page)} 
                variant={page === currentPage ? 'contained' : 'outlined'} 
                sx={{ mx: 0.5 }}>
                {page}
              </Button>
            );
          })}
          <Button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage === totalPages} 
            variant="contained"
            sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' }, ml: 2 }}>
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default DashboardContent;