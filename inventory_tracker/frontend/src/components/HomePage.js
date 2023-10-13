// Import React.js
import React, { Component } from 'react';

// Import components
import AddItem from "./AddItem";


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect
} from "react-router-dom";

// Render home page.
export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>In Home page</h1>
            </div>
        );
    }
}

