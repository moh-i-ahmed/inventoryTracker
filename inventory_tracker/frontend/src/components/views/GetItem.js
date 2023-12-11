import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

// project components
import { ItemTable } from '../utils/ItemTable';
import { NavBar } from '../utils/NavBar';
import { fetchItemDetails } from '../services/itemService';
import { setTitle } from '../utils/utils';

export default function GetItem(props) {
    setTitle( { title:"Inventory Tracker | Get Item" } );

    const [itemData, setItemData] = useState([]);
    let { item_id } = useParams(); // get item_id from url params

    // Fetch item details on page load
    useEffect(() => {
        const fetchData = async () => {
            if (item_id) {
                const data = await fetchItemDetails(item_id);
                setItemData([data]);
            }
        }
        fetchData().catch(error => console.error("Error in fetchData:", error));
    }, [item_id]);

    return (
        <>
            <Typography variant="h5">Item Details</Typography>
            <ItemTable items={itemData} />
            <NavBar />
        </>
    );
}
