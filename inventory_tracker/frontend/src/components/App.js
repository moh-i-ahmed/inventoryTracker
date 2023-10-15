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

// main component (App)
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    // Render all App components
    render() {
        return (
            <>
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

// useEffect(() => {
//     const favicon = document.getElementById('favicon');
//     favicon.setAttribute('href', '/static/images/favicon.ico');
// }, []);

// Render the div for React.js to control
const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
