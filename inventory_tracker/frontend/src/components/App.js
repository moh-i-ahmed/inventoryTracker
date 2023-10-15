// import react libraries
import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect
} from "react-router-dom";

// import components
import HomePage from "./HomePage";
import AddItem from "./AddItem";

// main component (App)
export default function App(props) {

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
