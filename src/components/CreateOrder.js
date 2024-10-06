import React, { useState } from 'react';
import { Container, Typography, Stepper, Step, StepLabel, Button, TextField } from '@mui/material';
import axios from 'axios';

// Step titles for the order process
const steps = ['Shipping Address', 'Confirm Order'];

const CreateOrder = () => {
  const [activeStep, setActiveStep] = useState(0); // Track the current step
  const [address, setAddress] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // If it's the last step, confirm the order
      confirmOrder();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Function to handle adding address
  const addAddress = async () => {
    try {
      const response = await axios.post('/addresses', { address });
      console.log('Address added:', response.data);
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  // Function to confirm the order
  const confirmOrder = async () => {
    try {
      await addAddress(); // First, add the address
      const response = await axios.post('/orders', {
        // Add any necessary order details here, such as product ID and quantity
      });
      console.log('Order created:', response.data);
      setOrderConfirmed(true); // Mark the order as confirmed
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Order
      </Typography>

      {/* Stepper component */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {orderConfirmed ? (
          <Typography variant="h5" style={{ marginTop: '20px' }}>
            Your order is confirmed.
          </Typography>
        ) : (
          <>
            {/* Step 1: Add Shipping Address */}
            {activeStep === 0 && (
              <div>
                <TextField
                  label="Shipping Address"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ marginTop: '20px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  style={{ marginTop: '20px' }}
                >
                  Next
                </Button>
              </div>
            )}

            {/* Step 2: Confirm Order */}
            {activeStep === 1 && (
              <div>
                <Typography variant="body1" style={{ marginTop: '20px' }}>
                  Please confirm your order.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  style={{ marginTop: '20px' }}
                >
                  Confirm Order
                </Button>
                <Button onClick={handleBack} style={{ marginTop: '20px', marginLeft: '10px' }}>
                  Back
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default CreateOrder;
