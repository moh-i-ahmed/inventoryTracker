import React, { useEffect, useState, } from 'react';
import { useNavigate } from "react-router-dom";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Box, Paper, InputAdornment  } from '@mui/material';

// project components
import { postItemDetails, putItemDetails } from "../services/itemService";

export const ItemForm = ({ itemData={}, isUpdating=false }) => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = isUpdating ? 'Inventory Tracker | Update Item' : 'Inventory Tracker | Add Item';
    }, [isUpdating]);

    const getInitialFormValues = () => {
        return {
            id: itemData ? itemData.id : '',
            name: itemData ? itemData.name : '',
            description: itemData ? itemData.description : '',
            price: itemData ? itemData.price : '',
            count: itemData ? itemData.count : '1',
            purchase_date: itemData ? dayjs(itemData.purchase_date) : dayjs(),
        };
    };

    // Update state when itemData changes
    useEffect(() => {
        setState(getInitialFormValues());
    }, [itemData]);

    const [state, setState] = useState(getInitialFormValues());

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setState({
            ...state,
            [id]: value,
        });
    };

    // Handler for date picker
    const handleDateChange = (newValue) => {
        setState({
            ...state,
            purchase_date: newValue
        });
    };

    // Handler for Add/Update button click
    const handleAddOrUpdateItemButtonOnClick = () => {
        if (isUpdating) {
            putItemDetails(state, navigate);
        } else {
            postItemDetails(state, navigate);
        }
    };

    const formStyle = {
        padding: '20px',
        backgroundColor: '#f0f4f8', 
        margin: '20px',
        borderRadius: '15px'
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
                                    style={{width: '100%'}}
                                    value={state.name}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box marginBottom={2}>
                                <TextField
                                    id="description"
                                    label="Description"
                                    style={{width: '100%'}}
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
                                    style={{width: '100%'}}
                                    value={state.price}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">£</InputAdornment>,
                                        inputProps: { min: 0.0, step: 0.25 }
                                    }}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box marginBottom={2}>
                                <TextField
                                    id="count"
                                    label="Count"
                                    required
                                    type="number"
                                    style={{width: '100%'}}
                                    value={state.count}
                                    inputProps={{ min: 1 }}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box marginBottom={2}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        id="purchase_date"
                                        label="Purchase Date"
                                        style={{width: '100%'}}
                                        value={state.purchase_date}
                                        onChange={handleDateChange}
                                        format="DD/MMM/YYYY"
                                    />
                                </LocalizationProvider>
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
