import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, TextField, Button } from '@mui/material';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL parameters
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch product details based on the product ID
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>; // Handle loading state

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      
      <Card>
        <CardMedia
          component="img"
          alt={product.name || 'Product image not available'} // Alternate text for accessibility
          image={product.image || 'https://via.placeholder.com/300'} // Fallback image URL if no image is provided
          title={product.name}
          style={{ height: '300px', objectFit: 'contain' }} // Properly bounds the image
        />
        <CardContent>
          <Typography variant="h5">
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>

          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            inputProps={{ min: 1 }} // Prevent negative quantity
            style={{ marginTop: '20px' }}
          />

          <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
