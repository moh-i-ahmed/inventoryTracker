import React, { Component, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";

// import components
import HomePage from "./HomePage";
import AddItem from "./AddItem";
import GetItem from "./GetItem";
import { ClassNames } from "@emotion/react";

// main component
export default function App(props) {

    return (
        <div className="center">
            <Router>
                <Routes>
                    <Route path="/"                  element={<HomePage/>} />
                    <Route path="/add-item"          element={<AddItem/>} />
                    <Route path="/get-item/:item_id" element={<GetItem/>} />
                </Routes>
            </Router>
        </div>
    );
}
