import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';

const MuiNavBar = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" color="inherit" sx={{mr: 2}}>
                        <ShoppingCartIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        {/* Add links for login and signup, adjust the 'to' attribute accordingly */}
                        <Link to="/login" style={{textDecoration: 'none', color: 'inherit', marginRight: '10px'}}>Login</Link>
                        <Link to="/signup" style={{textDecoration: 'none', color: 'inherit'}}>Signup</Link>
                    </Typography>
                    {/* Add other components like search bar, home link, and admin link as needed */}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MuiNavBar;
