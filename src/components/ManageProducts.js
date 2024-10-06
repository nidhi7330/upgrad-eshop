import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar
} from '@mui/material';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/products/${selectedProduct.id}`);
      setAlertMessage(`Product ${selectedProduct.name} deleted successfully`);
      setAlertSeverity('success');
      fetchProducts(); // Refresh product list
    } catch (error) {
      setAlertMessage('Error deleting product');
      setAlertSeverity('error');
    } finally {
      setIsSnackbarOpen(true);
      handleDialogClose();
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('/products', newProduct);
      setAlertMessage(`Product ${response.data.name} added successfully`);
      setAlertSeverity('success');
      setNewProduct({ name: '', price: '', description: '', image: '' }); // Reset form
      fetchProducts(); // Refresh product list
    } catch (error) {
      setAlertMessage('Error adding product');
      setAlertSeverity('error');
    } finally {
      setIsSnackbarOpen(true);
    }
  };

  const handleModifyProduct = async (product) => {
    try {
      await axios.put(`/products/${product.id}`, product);
      setAlertMessage(`Product ${product.name} modified successfully`);
      setAlertSeverity('success');
      fetchProducts(); // Refresh product list
    } catch (error) {
      setAlertMessage('Error modifying product');
      setAlertSeverity('error');
    } finally {
      setIsSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Products
      </Typography>

      {/* Add Product Form */}
      <Typography variant="h6">Add New Product</Typography>
      <TextField
        label="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Image URL"
        value={newProduct.image}
        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddProduct}>
        Add Product
      </Button>

      {/* Display Product Cards */}
      {products.map((product) => (
        <Card key={product.id} style={{ margin: '20px 0' }}>
          <CardContent>
            <Typography variant="h5">{product.name}</Typography>
            <Typography>Price: ${product.price}</Typography>
            <Typography>{product.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleModifyProduct(product)}>
              Edit
            </Button>
            <Button size="small" onClick={() => handleDeleteClick(product)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedProduct?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ManageProducts;
