import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";

export default function HomePage() {

    const [users, setUsers] = useState([
        { id: 1, firstName: 'Frank', email: 'frank.murphy@test.com', role: 'User' },
        { id: 2, firstName: 'Vic', email: 'vic.reynolds@test.com', role: 'Admin' },
        { id: 3, firstName: 'Gina', email: 'gina.jabowski@test.com', role: 'Admin' },
        { id: 4, firstName: 'Jessi', email: 'jessi.glaser@test.com', role: 'User' },
        { id: 5, firstName: 'Jay', email: 'jay.bilzerian@test.com', role: 'User' }
    ]);

    return (
        <div className="container">
            <h1>Inventory</h1>
            <h2>Display a list of items in inventory</h2>
            <table className="table table-bordered table-hover table-responsive-md">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

