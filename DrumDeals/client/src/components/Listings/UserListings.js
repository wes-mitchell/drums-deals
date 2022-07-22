import React from "react";
import { useState, useEffect } from "react";
import { getCurrentUserListings } from "../../modules/listingsManager";
import { Listing } from "./Listing";
import {CardDeck} from "reactstrap"

export const UserListings = ({isLoggedIn}) => {
  const [listings, setListings] = useState([])
  
  const getListings = () => {
    getCurrentUserListings()
    .then(listings => setListings(listings))
  }
  
  useEffect(() => {
    getListings()
  }, [])
  
  return (
    <>
    <h1>Your Listings</h1>
    <CardDeck>
      {listings.map((listing) => (
        <Listing listing={listing} key={listing.id} />
      ))}
    </CardDeck>
    </>
    )
  }