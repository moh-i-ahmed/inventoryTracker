import React, { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export function MuiDatePicker({ onChange, purchaseDate }) {
    const [selectedDate, setSelectedDate] = useState(dayjs(purchaseDate));
    console.log("Generated date:", selectedDate)

    // Handler for date picker, it actually uses the referenced onChange parameter
    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                id="purchase_date"
                label="Purchase Date"
                style={{width: '100%'}}
                value={selectedDate}
                onChange={handleDateChange}
                format="DD/MMM/YYYY"
            />
        </LocalizationProvider>
    );
}
