import React, { useContext } from 'react';
import { Typography, IconButton, TextField, Paper, Grid, CardMedia, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQty, removeItem } = useContext(CartContext);

    const handleQtyChange = (e) => {
        const newQty = parseInt(e.target.value, 10);
        if (newQty > 0) {
            updateQty(item.id, newQty);
        }
    };

    return (
        <Paper elevation={0} sx={{ p: 2, mb: 2, border: '1px solid #eee' }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                    <Link component={RouterLink} to={`/products/${item.id}`}>
                        <CardMedia
                            component="img"
                            image={item.imageUrl}
                            alt={item.name}
                            sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
                        />
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link component={RouterLink} to={`/products/${item.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ '&:hover': { color: 'primary.main' } }}>
                            {item.name}
                        </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">{item.authors || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" fontWeight="bold">${item.price.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        value={item.qty}
                        onChange={handleQtyChange}
                        inputProps={{ min: 1, style: { textAlign: 'center' } }}
                        sx={{ width: '80px' }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="subtitle1" fontWeight="bold">${(item.price * item.qty).toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton aria-label="delete" onClick={() => removeItem(item.id)}>
                        <DeleteOutlineIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CartItem;
