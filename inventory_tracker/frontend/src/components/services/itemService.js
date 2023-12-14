import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";

export const getAllItemsApiUrl = () => {
    return '/api'
}

export const addItem = () => {
    return '/api/add-item'
}

// Fetch item details given item id
export const fetchItemDetails = async (item_id) => {
    try {
        const response = await fetch(`/api/get-item/?id=${item_id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching item details:', error);
        throw error; // or return a default value or error object depending on your error handling strategy
    }
};

// Build payload/request options given item details
const requestOptions = (method, item) => ({
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        count: item.count,
        purchase_date: dayjs(item.purchase_date).format('YYYY-MM-DD'),
    }),
});

export const postItem = async (item, navigate) => {
    try {
        delete item.id;
        const response = await fetch('/api/add-item', requestOptions('POST', item));
        const data = await response.json();
        navigate('/get-item/' + data.id);
    } catch (error) {
        console.error('Error in adding item:', error);
    }
};

export const putItem = async (item, navigate) => {
    try {
        const response = await fetch(`/api/update-item/?id=${item.id}`, requestOptions('PUT', item));
        const data = await response.json();
        navigate(`/get-item/${data.id}`);
    } catch (error) {
        console.error('Error in updating item:', error);
    }
};

export const deleteItem = async (id, onDeleteSuccess=false) => {
    try {
        const response = await fetch(`/api/delete-item/?id=${id}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            onDeleteSuccess(id);
        } else {
            console.log("Error deleting item")
        }
    } catch (error) {
        console.error('Error deleting item:', error);
    }
};