import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <h1>Welcome to Drum Deals</h1> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="Listings" >
            <Route index element={<p>Listing Component here</p>} />
          </Route>

          <Route path="Categories">
            <Route index element={<p>Category List</p>} />
            <Route path="create" element={<p>Category Create Form</p>} />
          </Route>

          <Route path="users">
            <Route index element={<p>User List</p>} />
            <Route path="details/:id" element={<p>User Details</p>} />
          </Route>

          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};