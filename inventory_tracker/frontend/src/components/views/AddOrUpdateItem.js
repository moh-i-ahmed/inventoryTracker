import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// project components
import { ItemForm } from '../utils/ItemForm';
import { NavBar } from '../utils/NavBar';
import { fetchItemDetails } from '../services/itemService';

export default function AddOrUpdateItem() {
    const navigate = useNavigate();
    const { item_id } = useParams(); // get item_id from url params
    const [itemData, setItemData] = useState(null);
    const isUpdating = Boolean(item_id);

    useEffect(() => {
        if (isUpdating) {
            // fetch item details given item id
            const fetchData = async () => {
                const data = await fetchItemDetails(item_id);
                if (data && data.id) {
                    setItemData({
                        ...data,
                        purchase_date: dayjs(data.purchase_date).format('DD/MMM/YYYY'),
                    });
                }
            }

            fetchData().catch(error => console.error("Error in fetchData:", error));
        }
    }, [item_id, navigate]);

    return (
        <>
            <ItemForm itemData={itemData} isUpdating={isUpdating} />
            <div>
                <NavBar />
            </div>
        </>
    );
};
