import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchCategories } from '../api/categoryApi';
import CategoryIcon from '@mui/icons-material/Category'; // Placeholder icon

const CategoryBar = () => {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const getCategories = async () => {
            try {
                const cats = await fetchCategories();
                setCategories(cats.slice(0, 8)); // Limit to 8 categories for a clean look
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        }
        getCategories();
    }, []);

    return (
        <Box mb={5}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                {t('home.categories')}
            </Typography>
            <Grid container spacing={2}>
                {categories.map(cat => (
                    <Grid item xs={6} sm={4} md={3} lg={1.5} key={cat.id} sx={{ display: 'flex' }}>
                        <Paper 
                            elevation={1} 
                            sx={{ 
                                p: 2, 
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                '&:hover': {
                                    boxShadow: 3, 
                                    cursor: 'pointer'
                                } 
                            }}
                        >
                            <CategoryIcon color="primary" sx={{fontSize: 40, mb: 1}} />
                            <Typography variant="subtitle1" component="h3" align="center">{cat.name}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default CategoryBar;
