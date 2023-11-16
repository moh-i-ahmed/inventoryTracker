import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// project components
import { ItemForm } from './utils/ItemForm';
import { NavBar } from './utils/NavBar';
import { getItemApiUrl } from './utils/endpoints';

export default function AddOrUpdateItem() {
    const navigate = useNavigate();
    const { item_id } = useParams();
    const [itemData, setItemData] = useState(null);
    const isUpdating = Boolean(item_id);

    useEffect(() => {
        if (isUpdating) {
            fetch(getItemApiUrl({item_id}))
                .then(response => response.json())
                .then(data => {
                    if (data && data.id) {
                        setItemData({
                            ...data,
                            purchase_date: dayjs(data.purchase_date),
                        });
                    } else {
                        console.error('Error fetching item details:', error);
                    }
                })
                .catch(err => {
                    console.error("Error fetching item:", err);
                });
                console.log(data)
        }
    }, [item_id, navigate]);

    return (
        <>
            <ItemForm initialData={itemData} isUpdating={isUpdating} />
            <NavBar />
        </>
    );
};
