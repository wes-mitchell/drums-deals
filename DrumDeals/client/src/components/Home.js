import React, { useState, useEffect } from "react";
import {CardDeck, Card, CardBody} from "reactstrap"
import { Listing } from "./Listings/Listing";
import { getHomeListings } from "../modules/listingsManager";


export const Home = ({isLoggedIn}) => {
const [listings, setListings] = useState([])

const getListings = () => {
  getHomeListings()
  .then(listings => setListings(listings))
}

useEffect(() => {
  getListings()
}, [])

return (
  <>
  <h1>Home Page View!</h1>
  <CardDeck>
    {listings.map((listing) => (
      <Listing listing={listing} key={listing.id} />
    ))}
  </CardDeck>
  </>
  )
}