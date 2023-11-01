import React, { Component, useEffect, useState } from 'react';

// 3rd party
import { Typography, TableContainer, Paper } from '@mui/material';

// my components
import { ItemTable } from './ItemTable';

export default function HomePage() {

    const headers = ['ID', 'Name', 'Description', 'Price', 'Count', 'Purchase Date'];
    const [items, setItems] = useState([]);
    
    useEffect(() => {

        fetch('/api/' )
            .then((response) => response.json())
            .then((data) => {
                setItems(data)
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
            });
            console.log(items)
    }, []);

    return (
        <>
            <Typography variant="h5">Inventory Items</Typography>
            <ItemTable headers={headers} items={items} />
        </>
    );
}

