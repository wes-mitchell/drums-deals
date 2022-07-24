import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllListings } from "../../modules/listingsManager";
import { Listing } from "./Listing";
import {CardDeck, CardGroup, Button} from "reactstrap"

export const ListingsList = ({isLoggedIn}) => {
  const navigate = useNavigate()
  const [loading, setIsLoading]  = useState(true)
  const [listings, setListings] = useState([])

  const getListings = () => {
    getAllListings()
    .then(listings => setListings(listings))
    .then(() => setIsLoading(false))
  }
  
  useEffect(() => {
    getListings()
  }, [])
  
  return (
    <>
    <h1>Current Listings</h1>
    <Button type="button" onClick={() => navigate(`/listings/create`)}>Add Listing</Button>
    <CardDeck>
      {listings.map((listing) => (
        <Listing listing={listing} key={listing.id} />
      ))}
    </CardDeck>
    </>
    )
  }