import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    Typography,
    Box,
    Button,
    TextField,
    Grid,
    Link,
    Snackbar,
    Alert,
    IconButton,
    InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAuth from '../hooks/useAuth';

export default function Register() {
    const { registerUser, error } = useAuth();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setOpenSnackbar(true);
            return;
        }
        const data = Object.fromEntries(new FormData(event.currentTarget));
        try {
            await registerUser(data);
        } catch (e) {
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            sx={{
                marginTop: 4, 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '500px',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: '0 0 25px rgba(0, 128, 0, 0.6)', 
                    bgcolor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: 'glow 1.5s infinite alternate', 
                }}
            >
                
                <Box
                    sx={{
                        m: 1,
                        width: 80,
                        height: 80,
                        borderRadius: '50%', 
                        bgcolor: '#4CAF50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ArrowDropDownIcon sx={{ color: 'white', fontSize: 50 }} />
                </Box>
                <Typography component="h1" variant="h5" sx={{ mt: 2, color: '#4CAF50' }}>
                    Silk Road
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        mt: 3,
                    }}
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                autoFocus
                                error={!!error}
                                helperText={error ? error : ''}
                                InputProps={{
                                    sx: {
                                        borderRadius: 2, 
                                        border: '1px solid #ddd',  
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Apellidos"
                                name="lastName"
                                autoComplete="family-name"
                                error={!!error}
                                helperText={error ? error : ''}
                                InputProps={{
                                    sx: {
                                        borderRadius: 2,  
                                        border: '1px solid #ddd',  
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Correo electrónico"
                                name="email"
                                autoComplete="email"
                                error={!!error}
                                helperText={error ? error : ''}
                                InputProps={{
                                    sx: {
                                        borderRadius: 2,  
                                        border: '1px solid #ddd', 
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!error}
                                helperText={error ? error : ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        borderRadius: 2,  
                                        border: '1px solid #ddd',  
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirmar contraseña"
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={password !== confirmPassword}
                                helperText={password !== confirmPassword ? 'Las contraseñas no coinciden' : ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        borderRadius: 2, 
                                        border: '1px solid #ddd',  
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            color: 'white',
                            bgcolor: '#4CAF50', 
                            '&:hover': {
                                bgcolor: '#45a049', 
                            },
                        }}
                    >
                        Registrarse
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link
                                href="/login"
                                variant="body2"
                                sx={{
                                    mt: 2,
                                    fontSize: '0.875rem',
                                    color: '#4CAF50', 
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        color: '#45a049', 
                                    },
                                }}
                            >
                                ¿Ya tienes una cuenta? Inicia sesión
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {error || 'Ha ocurrido un error al registrarse.'}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}