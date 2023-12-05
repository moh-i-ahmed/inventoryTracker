import React from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import dayjs from "dayjs";

export const MuiDatePicker = ({ value, onChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Purchase Date"
                format="DD/MMM/YYYY"
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};



// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { useState } from "react";
// import dayjs from "dayjs";

// // Wrapper for the mui DatePicker component
// export const MuiDatePicker = () => {
//     const [selectedDate, setSelectedDate] = useState(dayjs());
//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//                 label="Purchase Date"
//                 type="date"
//                 format="DD/MMM/YYYY"
//                 value={selectedDate}
//                 onChange={(newValue) => { setSelectedDate(newValue) }}
//             />
//         </LocalizationProvider>
//     )
// }
