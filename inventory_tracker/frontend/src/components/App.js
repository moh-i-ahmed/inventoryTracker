// import react libraries
import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect
} from "react-router-dom";

// import mui
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';


// import components
import HomePage from "./HomePage";
import AddItem from "./AddItem";
import MuiDatePicker from "./MuiDatePicker";

// Create theme provider
// const theme = createTheme();
// const useStyles = makeStyles((theme) => {
//     root: {}
// });

// root/main component (App)
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    // classes = useStyles();
    // Render all App components
    render() {
        return (
            <>
                {/* <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider> */}
                <Router>
                    <Routes>
                        <Route path="/"         element={<HomePage/>} />
                        <Route path="/add-item" element={<AddItem/>} />
                    </Routes>
                </Router>
            </>
        );
    }
}

// Render the div for React.js to control
const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
