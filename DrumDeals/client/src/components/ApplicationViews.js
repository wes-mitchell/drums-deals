import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { ListingsList } from "./Listings/ListingsList";
import { UserListings } from "./Listings/UserListings";
import { Listing } from "./Listings/Listing.js"
import { ListingForm } from "./Listings/ListingForm";
import { EditListingForm } from "./Listings/EditListingForm";
import { DeleteListing } from "./Listings/DeleteListing";
import { Home } from "./Home";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={isLoggedIn ? <Home isLoggedIn={isLoggedIn} /> : <Navigate to="/login" />}
          />

          <Route path="listings" >
            <Route index element={<ListingsList />} />
            <Route path="mylistings" element={<UserListings />} />
            <Route path="details/:id" element={<p>Listing Detials Component</p>} />
            <Route path="edit/:id" element={<EditListingForm /> } />
            <Route path="create" element={<ListingForm />} />
            <Route path="delete/:id" element={<DeleteListing /> } />
          </Route>

          <Route path="categories">
            <Route index element={<p>Category List</p>} />
            <Route path="create" element={<p>Category Create Form</p>} />
          </Route>

          <Route path="users">
            <Route index element={<p>User List</p>} />
            <Route path="details/:id" element={<p>User Details</p>} />
          </Route>

          <Route path="*" element={<p>Whoops, nothing here...</p>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </main>
  );
};