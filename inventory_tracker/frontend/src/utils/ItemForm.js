import React, { useEffect, useState, } from 'react';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Button, Grid, Typography, TextField, FormControl, FormHelperText, Box, Paper } from '@mui/material';

// project components
import { postItemDetails, putItemDetails } from '../services/itemService';
import { MuiDatePicker } from './MuiDatePicker';

export const ItemForm = ({ itemData = {}, isUpdating = false }) => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = isUpdating ? 'Inventory Tracker | Update Item' : 'Inventory Tracker | Add Item';
    }, [isUpdating]);

    const getInitialFormValues = () => {
        if (!itemData) {
            return {
                id: '',
                name: '',
                description: '',
                price: '',
                count: '',
                purchase_date: dayjs().format('YYYY-MM-DD'),
            };
        }
        return {
            id: itemData.id || '',
            name: itemData.name || '',
            description: itemData.description || '',
            price: itemData.price || '',
            count: itemData.count || '',
            purchase_date: itemData.purchase_date ? dayjs(itemData.purchase_date) : dayjs(),
        };
    };

    useEffect(() => {
        // Update state when itemData changes
        setState(getInitialFormValues());
    }, [itemData]);

    const [state, setState] = useState(getInitialFormValues());
    // const [state, setState] = useState({
    //     id: itemData.id || '',
    //     name: itemData.name || '',
    //     description: itemData.description || '',
    //     price: itemData.price || '',
    //     count: itemData.count || '',
    //     purchase_date: itemData.purchase_date ? dayjs(itemData.purchase_date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
    // });
    console.log(itemData)

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setState({
            ...state,
            [id]: value,
        });
    };

    // Handler specifically for the date picker
    const handleDateChange = (newValue) => {
        setState({
            ...state,
            purchase_date: newValue
        });
    };

    const formStyle = {
        padding: '20px',
        backgroundColor: '#f0f4f8', 
        margin: '20px',
        borderRadius: '15px'
    };

    const handleAddOrUpdateItemButtonOnClick = () => {
        if (isUpdating) {
            putItemDetails(state, navigate);
        } else {
            postItemDetails(state, navigate);
        }
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
                                    style={{width: '100%'}}
                                    value={state.count}
                                    inputProps={{ min: 1 }}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box marginBottom={2}>
                                <MuiDatePicker
                                    value={state.purchase_date}
                                    onChange={handleDateChange}
                                />
                            </Box>
                            {/* <Box marginBottom={2}>
                                <MuiDatePicker
                                    id="purchase_date"
                                    style={{width: '100%'}}
                                    value={state.purchase_date}
                                    onChange={handleInputChange}
                                />
                            </Box> */}
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
