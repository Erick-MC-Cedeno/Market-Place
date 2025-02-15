import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, MenuItem, Select, InputLabel, FormControl, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom';
import useProducts from '../hooks/useProducts'; 
import { AuthContext } from '../hooks/AuthContext';

function CreateProduct() {
    const { createProduct, loading, error } = useProducts(); 
    const { auth } = useContext(AuthContext); 
    const [name, setName] = useState(''); 
    const [photo, setPhoto] = useState(null); 
    const [preview, setPreview] = useState(''); 
    const [category, setCategory] = useState(''); 
    const history = useHistory();

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file); 
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); 
            };
            reader.readAsDataURL(file); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!name || !photo || !auth?.email || !category) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', auth.email);
        formData.append('photo', photo); 
        formData.append('category', category); 

        await createProduct(formData);

        setName('');
        setPhoto(null);
        setPreview('');
        setCategory(''); 
    };

    const handleBack = () => {
        history.push('/');
    };

    return (
        <Paper
            elevation={3}
            sx={{
                marginTop: 4,
                padding: 4,
                maxWidth: 600,
                margin: '0 auto',
                borderRadius: 3,
                bgcolor: '#f9f9f9',
            }}
        >
            <Typography variant="h4" sx={{ mb: 4, color: '#4CAF50', textAlign: 'center', fontWeight: 'bold' }}>
                Crear Nuevo Producto
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Nombre del Producto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 3 }}
                    required
                />

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="category-label">Categoría del Producto</InputLabel>
                    <Select
                        labelId="category-label"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Categoría del Producto"
                        required
                    >
                        <MenuItem value="electronics">Electronics</MenuItem>
                        <MenuItem value="clothes">Clothes</MenuItem>
                        <MenuItem value="vehicles">Vehicles</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ mb: 3 }}>
                    <input
                        type="file"
                        accept="image/*" 
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                        id="photo-upload"
                        required
                    />
                    <label htmlFor="photo-upload">
                        <Button
                            variant="contained"
                            component="span"
                            sx={{
                                bgcolor: '#4CAF50',
                                '&:hover': { bgcolor: '#45a049' },
                                color: 'white',
                            }}
                        >
                            Subir Foto
                        </Button>
                    </label>
                    {preview && (
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Vista previa:
                            </Typography>
                            <img
                                src={preview}
                                alt="Vista previa de la foto"
                                style={{ maxWidth: '100%', borderRadius: 4 }}
                            />
                        </Box>
                    )}
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        bgcolor: '#4CAF50',
                        '&:hover': { bgcolor: '#45a049' },
                        color: 'white',
                        mb: 2,
                        fontWeight: 'bold',
                    }}
                    disabled={loading} 
                >
                    {loading ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : (
                        'Crear Producto'
                    )}
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                        color: '#4CAF50',
                        borderColor: '#4CAF50',
                        '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.1)' },
                        fontWeight: 'bold',
                    }}
                    onClick={handleBack}
                >
                    Regresar
                </Button>

                {error && (
                    <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                        Error: {error}
                    </Typography>
                )}
            </form>
        </Paper>
    );
}

export default CreateProduct;