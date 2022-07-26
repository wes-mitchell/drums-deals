import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllListings } from "../../modules/listingsManager";
import { getCurrentUser } from "../../modules/userProfileManager";
import { Listing } from "./Listing";
import { getAllUserFavorites } from "../../modules/favoritesManager";
import { searchListingsByTitle } from "../../modules/listingsManager";
import {CardDeck, CardGroup, Button} from "reactstrap"

export const ListingsList = () => {
  const navigate = useNavigate()
  const [userFavorites, setUserFavorites] = useState([])
  const [listings, setListings] = useState([])
  const [render, setRender] = useState(1)
  const [user, setUser] = useState({
    id: '',
    firstName: ''
  })

  const getUser = () => {
    getCurrentUser()
    .then(user => setUser(user))
  }

  const getListings = () => {
    getAllListings()
    .then(listings => setListings(listings))
  }

const getFavorites = () => {
  getAllUserFavorites()
  .then(favs => setUserFavorites(favs))
}  

const searchListings = (query) => {
  searchListingsByTitle(query)
  .then(listings => setListings(listings))
}

const handleFieldChange = (evt) => {
  searchListings(evt.target.value)
}

  useEffect(() => {
    getListings()
    getUser()
    getFavorites()
  }, [render])
  
  return (
    <>
    <h1>Current Listings</h1>
    <h3>Search For a Video</h3>
    <input type="text" className="search" onChange={handleFieldChange}/> <br/>
    <Button type="button" onClick={() => navigate(`/listings/create`)}>Add Listing</Button>
    <CardDeck>
      {listings.map((listing) => (
        <Listing listing={listing} key={listing.id} user={user} userFavorites={userFavorites} render={render} setRender={setRender} />
      ))}
    </CardDeck>
    </>
    )
  }