import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper
} from '@mui/material';

export const ItemTable = ({ items }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const location = useLocation();
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

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Inventory Table">
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
