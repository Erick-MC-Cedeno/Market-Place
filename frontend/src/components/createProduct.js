import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import useProducts from '../hooks/useProducts'; 
import { AuthContext } from '../hooks/AuthContext';

function CreateProduct() {
    const { createProduct, loading, error } = useProducts(); 
    const { auth } = useContext(AuthContext); 
    const [name, setName] = useState(''); 
    const [photo, setPhoto] = useState(null); 
    const [preview, setPreview] = useState(''); 

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

        if (!name || !photo || !auth?.email) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', auth.email);
        formData.append('photo', photo); 

        await createProduct(formData);

        setName('');
        setPhoto(null);
        setPreview('');
    };

    return (
        <Box
            sx={{
                marginTop: 4,
                padding: 3,
                maxWidth: 500,
                margin: '0 auto',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
                bgcolor: 'white',
            }}
        >
            <Typography variant="h5" sx={{ mb: 3, color: '#4CAF50', textAlign: 'center' }}>
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
                        <Box sx={{ mt: 2 }}>
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
                    }}
                    disabled={loading} 
                >
                    {loading ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : (
                        'Crear Producto'
                    )}
                </Button>

                {error && (
                    <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                        Error: {error}
                    </Typography>
                )}
            </form>
        </Box>
    );
}

export default CreateProduct;
