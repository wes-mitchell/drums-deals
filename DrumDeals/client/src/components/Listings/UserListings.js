import React from "react";
import { useState, useEffect } from "react";
import { getCurrentUserListings } from "../../modules/listingsManager";
import { getCurrentUser } from "../../modules/userProfileManager";
import { getAllUserFavorites } from "../../modules/favoritesManager";
import { Listing } from "./Listing";
import {Button, Row, Container} from "reactstrap"
import { useNavigate } from "react-router-dom";
import './UserListings.css'

export const UserListings = () => {
  const navigate = useNavigate()
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
    getCurrentUserListings()
    .then(listings => setListings(listings))
  }
  
  useEffect(() => {
    getListings()
    getUser()
    getFavorites()
  }, [render])
  
  return (
    <>
    <div className="userListContainer">
      <Container className="text-center">
        <h1>Your Listings</h1>
      </Container>
      <Row>
        <Button className="m-1 mb-2" type="button" color="primary" style={{width: "8rem"}} onClick={() => navigate(`/listings/create`)}>Add Listing</Button>
      </Row>
      <Row className="d-flex">
      {listings.map((listing) => (
        <Listing listing={listing} key={listing.id} user={user} userFavorites={userFavorites} render={render} setRender={setRender}/>
      ))}
      </Row>
    </div>
    </>
    )
  }