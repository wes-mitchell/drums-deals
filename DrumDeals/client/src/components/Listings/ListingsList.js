import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllListings } from "../../modules/listingsManager";
import { getCurrentUser } from "../../modules/userProfileManager";
import { Listing } from "./Listing";
import { getAllUserFavorites } from "../../modules/favoritesManager";
import { searchListingsByTitle } from "../../modules/listingsManager";
import { Button, Row, Container, Input } from "reactstrap"
import './ListingList.css'

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
      <div className="listContainer">
        <Container className="text-center">
          <h1>Current Listings</h1>
        </Container>
        <div className="searchBar">
          <Row>
            <Input className="m-1" type="text" onChange={handleFieldChange} style={{width: "15rem"}} placeholder='search for a listing' /> <br/>
          </Row>
        </div>
        <Row>
          <Button className="m-1 mb-2" type="button" color='primary' style={{width: "8rem"}} onClick={() => navigate(`/listings/create`)}>Add Listing</Button>
        </Row>
        <Row>
          {listings.map((listing) => (
            <Listing listing={listing} key={listing.id} user={user} userFavorites={userFavorites} render={render} setRender={setRender} />
          ))}
        </Row>
      </div>
    </>
    )
  }