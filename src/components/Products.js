import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, ToggleButton, ToggleButtonGroup, MenuItem, Select } from '@mui/material';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    // Fetch all categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // Fetch products based on the selected category
    const fetchProducts = async () => {
      try {
        const categoryQuery = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
        const response = await axios.get(`/products${categoryQuery}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  // Handle sorting of products
  const handleSortChange = (event) => {
    const sort = event.target.value;
    setSortOption(sort);

    let sortedProducts = [...products];

    if (sort === 'priceHighToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'priceLowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'newest') {
      sortedProducts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    
    setProducts(sortedProducts);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {/* Category Tabs */}
      <ToggleButtonGroup
        value={selectedCategory}
        exclusive
        onChange={(e, newCategory) => setSelectedCategory(newCategory)}
        aria-label="product categories"
      >
        <ToggleButton value="all" aria-label="all categories">
          All
        </ToggleButton>
        {categories.map((category) => (
          <ToggleButton key={category} value={category} aria-label={category}>
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Sorting Dropdown */}
      <Select
        value={sortOption}
        onChange={handleSortChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Sort products' }}
        style={{ margin: '20px 0' }}
      >
        <MenuItem value="default">Default</MenuItem>
        <MenuItem value="priceHighToLow">Price High to Low</MenuItem>
        <MenuItem value="priceLowToHigh">Price Low to High</MenuItem>
        <MenuItem value="newest">Newest</MenuItem>
      </Select>

      {/* Product Cards */}
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                height="140"
                image={product.image} // Assuming there's an 'image' field in your product object
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
