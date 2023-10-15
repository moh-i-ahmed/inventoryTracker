import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { MuiDatePicker } from './MuiDatePicker';
import dayjs from "dayjs";

export default function AddItem() {
    useEffect(() => { document.title = 'Inventory Tracker | Add Item'; }, []);

    const [state, setState] = useState({
        name: '',
        description: '',
        price: '',
        count: '',
        purchase_date: dayjs(),
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        setState({
            ...state,
            [id]: value,
        });
    };

    // onClick event handler for 'add item' button 
    const handleAddItemButtonOnClick = () => {
        if (typeof state.description === 'undefined') {
            state.description = '';
        }
        if (typeof state.purchase_date === 'undefined') {
            state.purchase_date = dayjs();
        }

        // build post request payload
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: state.name,
                description: state.description,
                price: state.price,
                count: state.count,
                purchase_date: state.purchase_date.format('YYYY-MM-DD'),
            }),
        };

        // post payload to api
        fetch('/api/add-item', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} align="center">
                <Typography variant="h4">Add Item</Typography>
                <Grid item xs={12} align="center">
                    <FormHelperText>
                        <div align="center">Add a new item to inventory</div>
                    </FormHelperText>
                    <FormControl>
                        <TextField 
                            id="name"
                            label="Name"
                            required
                            value={state.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            value={state.description}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="price"
                            label="Price"
                            required
                            type="number"
                            value={state.price}
                            inputProps={{ min: 0.0, step: 0.25 }}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="count"
                            label="Count"
                            required
                            type="number"
                            value={state.count}
                            inputProps={{ min: 1 }}
                            onChange={handleInputChange}
                        />
                        <MuiDatePicker
                            id="purchase_date"
                            value={state.purchase_date}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <Grid item xs={12} align="center">
                        <Button color="secondary" variant="contained" onClick={handleAddItemButtonOnClick} >Add Item</Button>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button color="primary" variant="contained" component={Link} to="/" >Back</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
