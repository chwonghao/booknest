import React from 'react';
import { Box, Typography } from '@mui/material';

const ProductManagementPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Product Management</Typography>
      <Typography>Here you can add, edit, and delete products.</Typography>
      {/* TODO: Implement product table, add/edit modals, etc. */}
    </Box>
  );
};

export default ProductManagementPage;