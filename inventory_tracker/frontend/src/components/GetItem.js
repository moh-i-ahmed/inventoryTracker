import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// 3rd party
import { Typography, Grid, Button } from '@mui/material';
import dayjs from 'dayjs';

// my components
import { ItemTable } from './ItemTable';

export default function GetItem(props) {
    const headers = ['ID', 'Name', 'Description', 'Price', 'Count', 'Purchase Date'];
    const [items, setItems] = useState([]);

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
                setItems([data]);
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
        <>
            <Typography variant="h5">Item Details</Typography>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" component={Link} to="/" >Back</Button>
            </Grid>
            <ItemTable headers={headers} items={items} />
        </>
    );
}
