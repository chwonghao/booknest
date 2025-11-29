import React, { useContext } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, Chip, CardActionArea } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const { t } = useTranslation();
    const { addItem } = useContext(CartContext);
    // Mock discount calculation if originalPrice is available
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    const handleAddToCart = (e) => {
        e.preventDefault(); // Stop the card's navigation event
        e.stopPropagation(); // Stop event bubbling
        addItem(product);
        toast.success(t('product.addedToCart', { name: product.name }));
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea component={RouterLink} to={`/products/${product.id}`} sx={{ flexGrow: 1 }}>
                <Box sx={{ position: 'relative' }}>
                    <CardMedia
                        component="img"
                        height="240"
                        image={product.imageUrl} // Placeholder image
                        alt={product.name}
                    />
                    {discount > 0 && (
                        <Chip 
                            label={`-${discount}%`} 
                            color="secondary" 
                            size="small"
                            sx={{ position: 'absolute', top: 8, right: 8, fontWeight: 'bold' }} 
                        />
                    )}
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" noWrap title={product.name}>
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                        {product.author || 'Unknown Author'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h5" color="primary.main" fontWeight="bold">
                            ${product.price}
                        </Typography>
                        {discount > 0 && (
                            <Typography variant="body2" sx={{ textDecoration: 'line-through' }} color="text.secondary">
                                ${product.originalPrice}
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </CardActionArea>
            <Box sx={{ p: 2, pt: 0 }}>
                <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddShoppingCartIcon />}
                    onClick={handleAddToCart}
                >
                    {t('product.addToCart')}
                </Button>
            </Box>
        </Card>
    );
}

export default ProductCard;
