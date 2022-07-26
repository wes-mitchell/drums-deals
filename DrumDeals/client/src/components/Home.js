import React, { useState, useEffect } from "react";
import {CardDeck, Card, CardBody} from "reactstrap"
import { Listing } from "./Listings/Listing";
import { getHomeListings } from "../modules/listingsManager";
import { getCurrentUser } from "../modules/userProfileManager";
import { getAllUserFavorites } from "../modules/favoritesManager";


export const Home = ({isLoggedIn}) => {
const [listings, setListings] = useState([])
const [userFavorites, setUserFavorites] = useState([])
const [favorited, setFavorited] = useState(null)
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
  getHomeListings()
  .then(listings => setListings(listings))
}

useEffect(() => {
  getListings()
  getUser()
  getFavorites()
}, [favorited])

return (
  <>
  <h1>Home Page View!</h1>
  <CardDeck>
    {listings.map((listing) => (
      <Listing listing={listing} key={listing.id} user={user} userFavorites={userFavorites} favorited={favorited} setFavorited={setFavorited} />
    ))}
  </CardDeck>
  </>
  )
}