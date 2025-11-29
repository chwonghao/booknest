import React, { useContext, useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, Box, Divider, List, ListItem, ListItemText, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { createOrderApi } from '../api/orderApi';

const CheckoutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, total, clearCart } = useContext(CartContext);
  const { user, isAuthenticated, loading: authLoading } = useContext(AuthContext);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.fullName || '',
    address: user?.address || '',
    phoneNumber: user?.phoneNumber || '',
    email: user?.email || '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'paypal'

  useEffect(() => {
    // Khi context auth hết loading và xác định người dùng chưa đăng nhập
    if (!authLoading && !isAuthenticated) {
      toast.info(t('cart.loginPrompt'));
      // Chuyển hướng về trang đăng nhập và lưu lại trang checkout để quay lại
      navigate('/login', { state: { from: '/checkout' }, replace: true });
    }
  }, [isAuthenticated, authLoading, navigate, t]);

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const orderPayload = {
        userId: user.id,
        orderItems: items.map(item => ({
          productId: item.id,
          quantity: item.qty
        })),
        status: "PENDING"
      };

      // Gọi API để tạo đơn hàng
      await createOrderApi(orderPayload);

      toast.success(t('checkout.orderPlacedSuccess'));
      clearCart();
      navigate('/cart'); // Chuyển về trang giỏ hàng sau khi đặt hàng
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
    }
  };

  if (authLoading || !isAuthenticated) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}><CircularProgress /></Box>;
  }

  if (items.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5">{t('checkout.noItems')}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/')}>
          {t('cart.continueShopping')}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        {t('checkout.title')}
      </Typography>
      <form onSubmit={handlePlaceOrder}>
        <Grid container spacing={4}>
          {/* Shipping Information */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>{t('checkout.shippingInfo')}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}><TextField required fullWidth name="fullName" label={t('register.fullName')} value={shippingInfo.fullName} onChange={handleInputChange} /></Grid>
                <Grid item xs={12}><TextField required fullWidth name="address" label={t('register.address')} value={shippingInfo.address} onChange={handleInputChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField required fullWidth name="phoneNumber" label={t('register.phoneNumber')} value={shippingInfo.phoneNumber} onChange={handleInputChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField required fullWidth name="email" type="email" label={t('register.email')} value={shippingInfo.email} onChange={handleInputChange} /></Grid>
              </Grid>
            </Paper>

            {/* Payment Method */}
            <Paper sx={{ p: 3, mt: 4 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'bold', color: 'text.primary' }}>{t('checkout.paymentMethod')}</FormLabel>
                <RadioGroup row name="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <FormControlLabel value="cod" control={<Radio />} label={t('checkout.cod')} />
                  <FormControlLabel value="paypal" control={<Radio />} label={t('checkout.paypal')} disabled />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, position: 'sticky', top: 88 }}>
              <Typography variant="h6" gutterBottom>{t('cart.summary.title')}</Typography>
              <Divider />
              <List>
                {items.map(item => (
                  <ListItem key={item.id} disableGutters>
                    <ListItemText primary={`${item.name} (x${item.qty})`} secondary={item.author} />
                    <Typography variant="body2">${(item.price * item.qty).toFixed(2)}</Typography>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                <Typography>{t('cart.summary.subtotal', { count: items.length })}</Typography>
                <Typography fontWeight="bold">${total.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>{t('cart.summary.shipping')}</Typography>
                <Typography fontWeight="bold">{t('cart.summary.free')}</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">{t('cart.summary.total')}</Typography>
                <Typography variant="h5" fontWeight="bold">${total.toFixed(2)}</Typography>
              </Box>
              <Button type="submit" fullWidth variant="contained" size="large">
                {t('checkout.placeOrder')}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CheckoutPage;
