export const getAllItemsApiUrl = () => {
    return '/api'
}

export const getItemApiUrl = ({ item_id }) => {
    return `/api/get-item?id=${item_id}`
}

export const addItemApiUrl = () => {
    return '/api/add-item'
}

export const updateItemApiUrl = ({ item_id }) => {
    return `/api/update-item/?id=${item_id}`
}
