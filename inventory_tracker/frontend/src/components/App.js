import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import { animateScroll } from "react-scroll";

// my components
import HomePage from "./HomePage";
import AddItem from "./AddItem";
import GetItem from "./GetItem";

// main component
export default function App(props) {

    useEffect(() => {
        animateScroll.scrollToBottom({
            containerId: "app",
            duration: 2000,
            smooth: true
        })
    }, []);

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
