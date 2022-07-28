import React, { useState, useEffect } from "react";
import {Row, Container} from "reactstrap"
import { Listing } from "./Listings/Listing";
import { getHomeListings } from "../modules/listingsManager";
import { getCurrentUser } from "../modules/userProfileManager";
import { getAllUserFavorites } from "../modules/favoritesManager";
import { log } from "../modules/imageManager";


export const Home = () => {
const [listings, setListings] = useState([])
const [userFavorites, setUserFavorites] = useState([])
const [render, setRender] = useState(1)
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
}, [render])

return (
  <>
    <Container className="m-1">
      <Container className="text-center">
        <h1>Welcome {user.firstName}!</h1> <br/>
        <h4>Here's the most recent listings</h4>
      </Container>
        <Row>
            {listings.map((listing) => (
              <Listing listing={listing} key={listing.id} user={user} userFavorites={userFavorites} render={render} setRender={setRender} />
            ))}
        </Row>
    </Container>
  </>
  )
}