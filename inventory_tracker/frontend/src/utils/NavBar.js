import React from 'react';
import { Link } from "react-router-dom";
import { Button, Grid } from '@mui/material';
export const NavBar = () => {
    return (
        <Grid item xs={12} align="left">
            <Button color="secondary" variant="contained" component={Link} to="/">Home</Button>
            &nbsp;&nbsp;&nbsp;
            <Button color="primary" variant="contained" component={Link} to="/add-item">Add Item</Button>
            &nbsp;&nbsp;&nbsp;
            <Button color="primary" variant="contained" component={Link} to="/">Update Item</Button>
        </Grid>
    );
};