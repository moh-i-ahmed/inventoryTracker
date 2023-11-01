import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';

export const ItemTable = ( {headers, items} ) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when changing rows per page
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Inventory Item">
                    <TableHead>
                            <TableRow>
                            {headers.map((header) => (
                                <TableCell key={header}>{header}</TableCell>
                            ))}
                            </TableRow>
                    </TableHead>
                    <TableBody>
                        {items
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map((item, index) => (
                                <TableRow key={index}>
                                    {Object.values(item).map((value, index) => (
                                        <TableCell key={index}>{value}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}