// import react
import React, { Component, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect
} from "react-router-dom";

// import components
import AddItem from "./AddItem";

export default function HomePage() {

    const [users, setUsers] = useState([
        { id: 1, firstName: 'Frank', lastName: 'Murphy', email: 'frank.murphy@test.com', role: 'User' },
        { id: 2, firstName: 'Vic', lastName: 'Reynolds', email: 'vic.reynolds@test.com', role: 'Admin' },
        { id: 3, firstName: 'Gina', lastName: 'Jabowski', email: 'gina.jabowski@test.com', role: 'Admin' },
        { id: 4, firstName: 'Jessi', lastName: 'Glaser', email: 'jessi.glaser@test.com', role: 'User' },
        { id: 5, firstName: 'Jay', lastName: 'Bilzerian', email: 'jay.bilzerian@test.com', role: 'User' }
    ]);

    return (
        <div className="container">
            <h1>Inventory</h1>
            <h2>Display a list of items in inventory</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Count</th>
                        <th>Purchase Date</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

