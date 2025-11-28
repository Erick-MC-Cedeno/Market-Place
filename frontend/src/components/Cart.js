"use client"

import React from "react"
import { Box, Drawer, IconButton, Typography, List, ListItem, ListItemText, Divider, Button } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'

function CartDrawer({ open, onClose, items = [], onRemove = () => {}, onUpdateQty = () => {} }) {
  const total = items.reduce((s, it) => s + (parseFloat(it.price || 0) * (it.qty || 1)), 0)

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 360, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Carrito de Compras</Typography>
          <IconButton onClick={onClose} aria-label="Cerrar carrito">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ flex: 1, overflow: 'auto', mt: 2 }}>
          {items.length === 0 ? (
            <Typography sx={{ color: 'text.secondary', textAlign: 'center', mt: 4 }}>Tu carrito está vacío</Typography>
          ) : (
            <List>
              {items.map((it, idx) => (
                <ListItem key={idx} sx={{ alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={`${it.name || 'Producto'} x${it.qty || 1}`}
                    secondary={`$${(parseFloat(it.price || 0) * (it.qty || 1)).toFixed(2)}`}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button size="small" variant="outlined" onClick={() => onUpdateQty(it, (it.qty || 1) + 1)}>+</Button>
                    <Button size="small" variant="outlined" onClick={() => onUpdateQty(it, Math.max(1, (it.qty || 1) - 1))}>-</Button>
                    <Button size="small" color="error" onClick={() => onRemove(it)}>Eliminar</Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        <Divider />

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>Total</Typography>
          <Typography sx={{ fontWeight: 800 }}>${total.toFixed(2)}</Typography>
        </Box>

        <Button variant="contained" sx={{ mt: 2 }} disabled={items.length === 0}>Comprar</Button>
      </Box>
    </Drawer>
  )
}

export default CartDrawer
