import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Alert } from '@mui/material';

// project components
import { ItemTable } from '../utils/ItemTable';
import { NavBar } from '../utils/NavBar';
import { fetchItemDetails, deleteItem } from '../services/itemService';
import { setTitle } from '../utils/utils';

export default function GetItem(props) {
    setTitle({ title: "Inventory Tracker | Get Item" });

    const [itemData, setItemData] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    let { item_id } = useParams(); // get item_id from url params

    useEffect(() => {
        fetchItemDetails(item_id).then(data => {
            setItemData([data]);
        }).catch(error => {
            console.error("Error in fetchData:", error);
        });
    }, [item_id]);

    const handleDeleteItem = (deletedId) => {
        deleteItem(deletedId, () => {
            setItemData([]); // Clears the item data from state
            setDeleteConfirmation(true); // Shows the deletion confirmation
        });
    };

    return (
        <>
            <Typography variant="h5">Item Details</Typography>
            {deleteConfirmation && <Alert severity="success">Item has been successfully deleted.</Alert>}
            {itemData.length > 0 && <ItemTable items={itemData} onDeleteSuccess={handleDeleteItem} />}
            <NavBar />
        </>
    );
}
