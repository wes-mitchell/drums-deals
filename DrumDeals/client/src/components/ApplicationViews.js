import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { ListingsList } from "./Listings/ListingsList";
import { UserListings } from "./Listings/UserListings";
import { ListingForm } from "./Listings/ListingForm";
import { EditListingForm } from "./Listings/EditListingForm";
import { DeleteListing } from "./Listings/DeleteListing";
import { ListingDetails } from "./Listings/ListingDetails";
import { FavoriteListings } from "./Listings/FavoriteListings";
import { OfferForm } from "./Offers/OfferForm";
import { Home } from "./Home";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={isLoggedIn ? <Home isLoggedIn={isLoggedIn} /> : <Navigate to="/login" />}
          />

          <Route path="listings" >
            <Route index element={ isLoggedIn ? <ListingsList isLoggedIn={isLoggedIn} /> : <Navigate to="/login"/> } />
            <Route path="mylistings" element={ isLoggedIn ? <UserListings isLoggedIn={isLoggedIn} /> : <Navigate to="/login"/>} />
            <Route path="details/:id" element={ isLoggedIn ? <ListingDetails isLoggedIn={isLoggedIn} /> : <Navigate to="/login"/>} />
            <Route path="edit/:id" element={ isLoggedIn ? <EditListingForm isLoggedIn={isLoggedIn} /> : <Navigate to="/login"/>} />
            <Route path="create" element={ isLoggedIn ? <ListingForm isLoggedIn={isLoggedIn} /> : <Navigate to="/login"/>} />
            <Route path="delete/:id" element={isLoggedIn ? <DeleteListing isLoggedIn={isLoggedIn} /> : <Navigate to="/login"/>} />
            <Route path="favorites" element={isLoggedIn ? <FavoriteListings isLoggedIn={isLoggedIn} /> : <Navigate to="/login"/>} />
          </Route>

          <Route path="categories">
            <Route index element={<p>Category List</p>} />
            <Route path="create" element={<p>Category Create Form</p>} />
          </Route>

          <Route path="users">
            <Route index element={<p>User List</p>} />
            <Route path="details/:id" element={<p>User Details</p>} />
          </Route>

          <Route path="offers">
            <Route index element={ isLoggedIn ? <OfferForm isLoggedIn={isLoggedIn} /> : <Navigate to="/login"/> } />
          </Route>

          <Route path="*" element={<p>Whoops, nothing here...</p>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </main>
  );
};