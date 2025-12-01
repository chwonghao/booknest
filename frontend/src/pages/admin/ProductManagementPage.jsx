import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert, Button, IconButton, Avatar, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchProducts, createProductApi, updateProductApi } from '../../api/productApi';

const initialProductState = {
  externalId: '',
  name: '',
  authors: '',
  publisher: '',
  language: '',
  isbn: '',
  categoryId: '',
  pagesNumber: '',
  publishYear: '',
  publishMonth: '',
  publishDay: '',
  description: '',
  imageUrl: '',
  stockQuantity: '',
  price: '',
};

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productFormData, setProductFormData] = useState(initialProductState);
  const [editingProductId, setEditingProductId] = useState(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      // Gọi fetchProducts không có tham số để lấy tất cả sản phẩm
      const data = await fetchProducts({});
      setProducts(data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
      setProducts([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleOpenModal = () => {
    setEditingProductId(null);
    setProductFormData(initialProductState);
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    // Ensure all fields in the form are controlled, even if product data is missing some.
    const formData = { ...initialProductState, ...product };
    setProductFormData(formData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProductId(null);
    setProductFormData(initialProductState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProduct = async () => {
    try {
      if (editingProductId) {
        // Update existing product
        await updateProductApi(editingProductId, productFormData);
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        await createProductApi(productFormData);
        toast.success('Product added successfully!');
      }
      handleCloseModal();
      getProducts(); // Refresh the product list
    } catch (apiError) {
      console.error('Failed to save product:', apiError);
      toast.error('Failed to save product.');
    }
  };

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h4" gutterBottom>Product Management</Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleOpenModal}>
        Add New Product
      </Button>

      {/* Product Table */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '10%' }}>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow hover key={product.id}>
                  <TableCell>
                    <Avatar variant="square" src={product.imageUrl} alt={product.name} sx={{ width: 56, height: 56 }} />
                  </TableCell>
                  <TableCell onClick={() => handleEditClick(product)} sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                    {product.name}
                  </TableCell>
                  <TableCell>{product.categoryName || 'N/A'}</TableCell>
                  <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                  <TableCell align="right">{product.stockQuantity}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleEditClick(product)}><EditIcon /></IconButton>
                    <IconButton color="error"><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Product Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth disableScrollLock={true}>
        <DialogTitle>{editingProductId ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Name" name="name" value={productFormData.name} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Authors" name="authors" value={productFormData.authors} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Publisher" name="publisher" value={productFormData.publisher} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Language" name="language" value={productFormData.language} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="ISBN" name="isbn" value={productFormData.isbn} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Category ID" name="categoryId" type="number" value={productFormData.categoryId} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Pages" name="pagesNumber" type="number" value={productFormData.pagesNumber} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Publish Year" name="publishYear" type="number" value={productFormData.publishYear} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Publish Month" name="publishMonth" type="number" value={productFormData.publishMonth} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Publish Day" name="publishDay" type="number" value={productFormData.publishDay} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Stock Quantity" name="stockQuantity" type="number" value={productFormData.stockQuantity} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Price" name="price" type="number" value={productFormData.price} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="External ID" name="externalId" value={productFormData.externalId} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={productFormData.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={productFormData.imageUrl}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveProduct} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProductManagementPage;