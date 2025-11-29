import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchProducts } from '../api/productApi';

// Refactored Components
import PromotionalBanners from '../components/PromotionalBanners';
import CategoryBar from '../components/CategoryBar';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        // Mock originalPrice for discount calculation demonstration
        const data = (await fetchProducts({ type: 'featured' })).map(p => ({
            ...p, 
            originalPrice: p.price && p.price > 0 ? Math.round(p.price * 1.25) : 0
        }));
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <Container maxWidth="lg">
        <PromotionalBanners />
        <CategoryBar />
      
        <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                {t('home.featuredBooks')}
            </Typography>
            {loading && <CircularProgress />}
            {error && <Typography color="error" align="center">{error}</Typography>}
            <Grid container spacing={3}>
                {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
                ))}
            </Grid>
        </Box>
    </Container>
  );
};

export default HomePage;
