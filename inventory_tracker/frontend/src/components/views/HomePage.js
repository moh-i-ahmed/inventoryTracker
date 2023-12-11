import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

// project components
import { getAllItemsApiUrl } from '../services/itemService';
import { ItemTable } from '../utils/ItemTable';
import { NavBar } from '../utils/NavBar';
import { setTitle } from '../utils/utils';

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

    const handleDeleteItem = (deletedId) => {
        setItems(items.filter(item => item.id !== deletedId));
    };

    return (
        <>
            <Typography variant="h5">Inventory Items</Typography>
            <ItemTable items={items} onDeleteItem={handleDeleteItem} />
            <NavBar />
        </>
    );
}
