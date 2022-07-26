import { useEffect, useState } from "react";
import { getCurrentUser } from "../../modules/userProfileManager";
import { getFavoriteListings } from "../../modules/listingsManager";
import { getAllUserFavorites } from "../../modules/favoritesManager";
import {CardDeck} from "reactstrap"
import { Listing } from "./Listing";

export const FavoriteListings = () => {
const [listings, setListings] = useState([])
const [userFavorites, setUserFavorites] = useState([])
const [render, setRender] = useState(1)
const [user, setUser] = useState({
  id: '',
  firstName: ''
})

const getListings = () => {
  getFavoriteListings()
  .then(listings => setListings(listings))
}

const getFavorites = () => {
  getAllUserFavorites()
  .then(favs => setUserFavorites(favs))
}

const getUser = () => {
  getCurrentUser()
  .then(user => setUser(user)) 
}

useEffect(() => {
  getListings()
  getUser()
  getFavorites()
}, [render])

  return (
    <>
    <h1>Yo favs yo!</h1>
    <CardDeck>
      {listings.map((listing) => (
        <Listing listing={listing} key={listing.id} user={user} userFavorites={userFavorites} render={render} setRender={setRender} />
      ))}
    </CardDeck>
    </>
  )
}