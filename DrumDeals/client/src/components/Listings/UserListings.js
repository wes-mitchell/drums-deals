import React from "react";
import { useState, useEffect } from "react";
import { getCurrentUserListings } from "../../modules/listingsManager";
import { Listing } from "./Listing";
import {CardDeck, Button, CardGroup, Card} from "reactstrap"
import { useNavigate } from "react-router-dom";

export const UserListings = ({isLoggedIn}) => {
  const navigate = useNavigate()
  const [loading, setIsLoading] = useState(true)
  const [listings, setListings] = useState([])

  const getListings = () => {
    getCurrentUserListings()
    .then(listings => setListings(listings))
    .then(() => setIsLoading(false))
  }
  
  useEffect(() => {
    getListings()
  }, [])
  
  return (
    <>
    <h1>Your Listings</h1>
    <Button type="button" onClick={() => navigate(`/listings/create`)}>Add Listing</Button>
    <CardDeck>
      {listings.map((listing) => (
        <Listing listing={listing} key={listing.id} />
      ))}
    </CardDeck>
    </>
    )
  }