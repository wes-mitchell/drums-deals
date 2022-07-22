import React from "react";
import { useState, useEffect } from "react";
import { getAllListings } from "../../modules/listingsManager";
import { Listing } from "./Listing";
import {CardDeck, CardGroup} from "reactstrap"

export const ListingsList = ({isLoggedIn}) => {
  const [listings, setListings] = useState([])
  
  const getListings = () => {
    getAllListings()
    .then(listings => setListings(listings))
  }
  
  useEffect(() => {
    getListings()
  }, [])
  
  return (
    <>
    <h1>All Listings</h1>
    <CardDeck>
      {listings.map((listing) => (
        <Listing listing={listing} key={listing.id} />
      ))}
    </CardDeck>
    </>
    )
  }