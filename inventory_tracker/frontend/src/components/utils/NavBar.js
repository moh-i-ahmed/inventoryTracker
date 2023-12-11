import React from 'react';
import { Button, Grid } from '@mui/material';

// project hooks
import { useNavigateToPath } from './utils';

export const NavBar = () => {

    const navigateToPath = useNavigateToPath();

    return (
        <Grid item xs={12} align="left">
            <Button color="secondary" variant="contained" onClick={() => navigateToPath("/")}>Home</Button>
            &nbsp;&nbsp;&nbsp;
            <Button color="primary" variant="contained" onClick={() => navigateToPath("/add-item")}>Add Item</Button>
            &nbsp;&nbsp;&nbsp;
        </Grid>
    );
};