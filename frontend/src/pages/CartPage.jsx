import React, { useContext } from 'react';
import { Box, Container, Typography, Paper, Button, Divider, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { t } = useTranslation();
  const { items, total, cartCount } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      toast.info(t('cart.summary.loginPrompt'));
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h5" component="h1" gutterBottom display="flex" alignItems="center" fontWeight="bold">
              <ShoppingCartIcon sx={{ mr: 2 }} /> {t('cart.title')} ({t('cart.itemCount', { count: cartCount })})
            </Typography>
            <Divider sx={{ my: 2 }} />
            {items.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" gutterBottom>
                  {t('cart.empty.title')}
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  {t('cart.empty.subtitle')}
                </Typography>
                <Button component={Link} to="/" variant="contained" color="primary">
                  {t('cart.continueShopping')}
                </Button>
              </Box>
            ) : (
              <Box>
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 88 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">{t('cart.summary.title')}</Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">{t('cart.summary.subtotal', { count: cartCount })}</Typography>
              <Typography fontWeight="bold">${total.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary">{t('cart.summary.shipping')}</Typography>
              <Typography fontWeight="bold">{t('cart.summary.free')}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5" fontWeight="bold">{t('cart.summary.total')}</Typography>
              <Typography variant="h5" fontWeight="bold">${total.toFixed(2)}</Typography>
            </Box>
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={handleCheckout}
              disabled={items.length === 0}
            >
              {t('cart.proceedToCheckout')}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
