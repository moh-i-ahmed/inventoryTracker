import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

// project components
import { ItemTable } from './utils/ItemTable';
import { NavBar } from './utils/NavBar';
import { getItemApiUrl } from './utils/endpoints';
import { setTitle } from './utils/utils';

export default function GetItem(props) {
    setTitle( { title:"Inventory Tracker | Get Item" } );

    const [items, setItems] = useState([]);

    let { item_id } = useParams(); // Get item_id from URL params

    useEffect(() => {
        if (item_id) {
            getItemDetails();
        }
    }, [item_id]);

    // fetch item details given item id
    const getItemDetails = () => {
        fetch(getItemApiUrl({item_id}))
            .then((response) => response.json())
            .then((data) => { setItems([data]) })
            .catch((error) => {
                console.error('Error fetching item details:', error);
            });
    };

    return (
        <>
            <Typography variant="h5">Item Details</Typography>
            <ItemTable items={items} />
            <NavBar />
        </>
    );
}
