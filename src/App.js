import React from 'react';
import logo from './logo.svg';
import './App.css';
import MuiNavBar from './components/MuiNavBar';
import { Router } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import CreateOrder from './pages/CreateOrder';
import ManageProducts from './pages/ManageProducts';





// Simulate a function to check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null; // Replace this with actual auth logic
};



function App() {
  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
  </header>*/}
      <Router>
      <MuiNavBar />
      <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/products"
            element={isAuthenticated() ? <Products /> : <Navigate to="/login" />}
          />     
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/manage-products" element={<ManageProducts />} />
  
             </Routes>
      </Router>
    </div>
  );
}

export default App;
