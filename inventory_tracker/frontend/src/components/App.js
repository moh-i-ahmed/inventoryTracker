import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { animateScroll } from "react-scroll";

// my components
import HomePage from "./views/HomePage";
import AddOrUpdateItem from "./views/AddOrUpdateItem";
import GetItem from "./views/GetItem";

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
                    <Route path="/"                     element={<HomePage/>} />
                    <Route path="/add-item"             element={<AddOrUpdateItem/>} />
                    <Route path="/update-item/:item_id" element={<AddOrUpdateItem/>} />
                    <Route path="/get-item/:item_id"    element={<GetItem/>} />
                </Routes>
            </Router>
        </div>
    );
}
