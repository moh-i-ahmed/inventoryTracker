import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// 3rd party
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tab } from '@mui/material';
import dayjs from 'dayjs';

export default function GetItem(props) {
    let { item_id } = useParams(); // Get item_id from URL params

    useEffect(() => {
        document.title = 'Inventory Tracker | Get Item';
        if (item_id) {
            getItemDetails();
        }
    }, [item_id]);

    // State for item details
    const [itemDetails, setItemDetails] = useState({
        name: '',
        description: '',
        price: '',
        count: '',
        purchase_date: '',
    });

    // fetch item details given item id
    const getItemDetails = () => {
        fetch('/api/get-item?id=' + item_id)
            .then((response) => response.json())
            .then((data) => {
                setItemDetails({
                    id: data.id || '',
                    name: data.name || '',
                    description: data.description || '',
                    price: data.price || '',
                    count: data.count || '',
                    purchase_date: dayjs(data.purchase_date).format('DD/MMM/YYYY') || '',
                });
            })
            .catch((error) => {
                console.error('Error fetching item details:', error);
            });
    };


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Inventory Item">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Count</TableCell>
                        <TableCell>Purchase Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow component="th" scope='row'>
                        <TableCell>{itemDetails.id}</TableCell>
                        <TableCell>{itemDetails.name}</TableCell>
                        <TableCell>{itemDetails.description}</TableCell>
                        <TableCell>{itemDetails.price}</TableCell>
                        <TableCell>{itemDetails.count}</TableCell>
                        <TableCell>{itemDetails.purchase_date}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
