import { useEffect, useState } from "react";
import { getCurrentUser } from "../../modules/userProfileManager";
import { getFavoriteListings } from "../../modules/listingsManager";
import { getAllUserFavorites } from "../../modules/favoritesManager";
import { Row, Container } from "reactstrap"
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
      <Container className="m-1">
        <Container className="text-center">
          <h1>Your Favorited Listings</h1>
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