import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

// project components
import { ItemTable } from './utils/ItemTable';
import { NavBar } from './utils/NavBar';
import { getAllItemsApiUrl } from './utils/endpoints';
import { setTitle } from './utils/utils';

export default function HomePage() {

    setTitle( { title:"Inventory Tracker | Home" } );
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(getAllItemsApiUrl())
            .then((response) => response.json())
            .then((data) => {
                setItems(data)
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
            });
    }, []);

    return (
        <>
            <Typography variant="h5">Inventory Items</Typography>
            <ItemTable items={items} />
            <NavBar />
        </>
    );
}

