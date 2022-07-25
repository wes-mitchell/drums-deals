import React from "react";
import { useState, useEffect } from "react";
import { getCurrentUserListings } from "../../modules/listingsManager";
import { getCurrentUser } from "../../modules/userProfileManager";
import { getAllUserFavorites } from "../../modules/favoritesManager";
import { Listing } from "./Listing";
import {CardDeck, Button, CardGroup, Card} from "reactstrap"
import { useNavigate } from "react-router-dom";

export const UserListings = ({isLoggedIn}) => {
  const navigate = useNavigate()
  const [listings, setListings] = useState([])
  const [userFavorites, setUserFavorites] = useState([])
  const [user, setUser] = useState({
    id: '',
    firstName: ''
  })
  
  const getUser = () => {
    getCurrentUser()
    .then(user => setUser(user))
  }

  const getFavorites = () => {
    getAllUserFavorites()
    .then(favs => setUserFavorites(favs))
  }

  const getListings = () => {
    getCurrentUserListings()
    .then(listings => setListings(listings))
  }
  
  useEffect(() => {
    getListings()
    getUser()
    getFavorites()
  }, [])
  
  return (
    <>
    <h1>Your Listings</h1>
    <Button type="button" onClick={() => navigate(`/listings/create`)}>Add Listing</Button>
    <CardDeck>
      {listings.map((listing) => (
        <Listing listing={listing} key={listing.id} user={user} userFavorites={userFavorites}/>
      ))}
    </CardDeck>
    </>
    )
  }