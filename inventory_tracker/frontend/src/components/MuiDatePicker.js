// import libraries
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";

// Wrapper for the mui DatePicker component
export const MuiDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    console.log(setSelectedDate)
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Purchase Date"
                type="date"
                format="DD/MMM/YYYY"
                value={selectedDate}
                onChange={(newValue) => { setSelectedDate(newValue) }}
            />
        </LocalizationProvider>
    )
}
