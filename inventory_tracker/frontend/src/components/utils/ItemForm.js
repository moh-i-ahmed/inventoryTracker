import React, { useEffect, useState, } from 'react';
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Box, Paper } from '@mui/material';

// projects
import { MuiDatePicker } from './MuiDatePicker';

export const ItemForm = ({ initialData = {}, isUpdating = false }) => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = isUpdating ? 'Inventory Tracker | Update Item' : 'Inventory Tracker | Add Item';
    }, [isUpdating]);

    // Set initial form values
    const initialFormValues = {
        name: '',
        description: '',
        price: '',
        count: '',
        purchase_date: dayjs().format('YYYY-MM-DD'),
    };

    // If initialData is not null, override the initial values
    if (initialData && initialData.purchase_date) {
        initialFormValues.purchase_date = dayjs(initialData.purchase_date).format('YYYY-MM-DD');
    }
    if (initialData) {
        initialFormValues.name = initialData.name || '';
        initialFormValues.description = initialData.description || '';
        initialFormValues.price = initialData.price || '';
        initialFormValues.count = initialData.count || '';
    }

    const [state, setState] = useState(initialFormValues);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setState({
            ...state,
            [id]: value,
        });
    };

    const formStyle = {
        padding: '20px',
        backgroundColor: '#f0f4f8', // Example color, you can choose your own
        margin: '20px',
        borderRadius: '15px'
    };

    const handleAddOrUpdateItemButtonOnClick = () => {
        // build post request payload
        const requestOptions = {
            method: isUpdating ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: state.name,
                description: state.description,
                price: state.price,
                count: state.count,
                purchase_date: dayjs(state.purchase_date).format('YYYY-MM-DD'),
            }),
        };

        const endpoint = isUpdating ? `/api/update-item/${initialData.id}` : '/api/add-item';

        fetch(endpoint, requestOptions)
            .then((response) => response.json())
            .then((data) => navigate('/get-item/' + data.id));
    };

    return (
        <Paper style={formStyle}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} align="center">
                    <Typography variant="h4">{isUpdating ? "Update" : "Add"} Item</Typography>
                    <FormHelperText>
                        <div align="center">{isUpdating ? "Update an existing item in inventory" : "Add a new item to inventory"}</div>
                    </FormHelperText>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <Box marginBottom={2}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    required
                                    value={state.name}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box marginBottom={2}>
                                <TextField
                                    id="description"
                                    label="Description"
                                    value={state.description}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box marginBottom={2}>
                                <TextField
                                    id="price"
                                    label="Price"
                                    required
                                    type="number"
                                    value={state.price}
                                    inputProps={{ min: 0.0, step: 0.25 }}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box marginBottom={2}>
                                <TextField
                                    id="count"
                                    label="Count"
                                    required
                                    type="number"
                                    style = {{width: 100}}
                                    value={state.count}
                                    inputProps={{ min: 1 }}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box marginBottom={2}>
                                <MuiDatePicker
                                    id="purchase_date"
                                    value={state.purchase_date}
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </FormControl>
                        <Grid item xs={12} align="center">
                            <Button color="secondary" variant="contained" onClick={handleAddOrUpdateItemButtonOnClick}>
                                {isUpdating ? "Update" : "Add"} Item
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
