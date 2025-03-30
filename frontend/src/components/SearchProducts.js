import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import useProducts from '../hooks/useProducts';
import InputAdornment from '@mui/material/InputAdornment';

function SearchProducts() {
  const { products, loading, error } = useProducts();
  const [keyword, setKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchClick = () => {
    setSubmittedKeyword(keyword);
  };

  const filteredProducts = products.filter((product) => {
    const key = submittedKeyword.toLowerCase();
    const name = product.name ? product.name.toLowerCase() : '';
    const description = product.description ? product.description.toLowerCase() : '';
    return key && (name.includes(key) || description.includes(key));
  });

  return (
    <Box sx={{ marginTop: 4, padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#4CAF50' }}>
        Buscar Productos
      </Typography>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Palabra clave"
          variant="outlined"
          value={keyword}
          onChange={handleKeywordChange}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  onClick={handleSearchClick}
                  sx={{ borderRadius: '50px', bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' } }}
                >
                  Buscar
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {loading ? (
        <Typography>Cargando productos...</Typography>
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : submittedKeyword === '' ? (
        <Typography>Ingrese una palabra clave y presione Buscar.</Typography>
      ) : filteredProducts.length === 0 ? (
        <Typography>No se encontraron productos.</Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  p: 4,
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  height: 450,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.name}
                  </Typography>
                  {product.description && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: '#555',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
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
                          objectFit: 'cover',
                          borderRadius: 4,
                          cursor: 'default'
                        }}
                      />
                    </Box>
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="body1" sx={{ color: '#4CAF50' }}>
                    Precio: ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#4CAF50',
                      '&:hover': { bgcolor: '#388E3C' },
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    Contactar
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default SearchProducts;
