import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Button } from '@mui/material';

// project hooks
import { useNavigateToPath } from './utils';
import { deleteItem } from '../services/itemService';

export const ItemTable = ({ items, onDeleteItem, onDeleteSuccess }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const location = useLocation();
    const navigateToPath = useNavigateToPath();
    const shouldShowPagination = !location.pathname.includes('get-item');

    // Format header string into 'Title Case' and replace underscores with spaces
    const formatHeader = (header) => {
        return header.replace(/_/g, ' ')
                     .split(' ')
                     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                     .join(' ');
    };

    // Generate headers from the keys of the first item
    const headers = items.length > 0 ? Object.keys(items[0]).map(formatHeader) : [];

    // Format date into desired format
    const formatCellValue = (key, value) => {
        if (key === 'price') {
            return `£${value}`;
        }
        if (key === 'purchase_date' && value) {
            return dayjs(value).format('DD/MMM/YYYY');
        }
        return value;
    };

    const handleChangePage = (event, newPage) => { setPage(newPage) };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when changing rows per page
    };

    const handleDelete = (id) => {
        deleteItem(id, () => {
            if (onDeleteSuccess) {
                onDeleteSuccess(id);
            } else if (onDeleteItem) {
                onDeleteItem(id); // Fallback if onDeleteSuccess is not provided
            }
        });
    };

    return (
        <>
            <TableContainer sx={{ minWidth: 3/4 }} component={Paper}>
                <Table sx={{ minWidth: 1000 }} aria-label="Inventory Table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableCell key={index}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map((item, itemIndex) => (
                                <TableRow key={itemIndex}>
                                    {Object.keys(item).map((key, valueIndex) => (
                                        <TableCell key={`${itemIndex}-${valueIndex}`}>
                                            {formatCellValue(key, item[key])}
                                        </TableCell>
                                    ))}
                                    <TableCell align='center'>
                                        <Button color="secondary" variant="contained" onClick={() => navigateToPath(`/update-item/${item.id}`)}>Update</Button>
                                        &nbsp;
                                        {/* <Button color="error" variant="contained" onClick={() => deleteItem(item.id, onDeleteItem)}>Delete</Button> */}
                                        <Button color="error" variant="contained" onClick={() => handleDelete(item.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {shouldShowPagination && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={items.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </>
    );
}
