import React from "react";
import { useState, useEffect } from "react";
import { getCurrentUserListings } from "../../modules/listingsManager";
import { getCurrentUser } from "../../modules/userProfileManager";
import { getAllUserFavorites } from "../../modules/favoritesManager";
import { Listing } from "./Listing";
import {Button, Row, Container} from "reactstrap"
import { useNavigate } from "react-router-dom";

export const UserListings = () => {
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
      <Container className="m-1">
        <Container className="text-center">
          <h1>Your Listings</h1>
        </Container>
        <Row>
          <Row>
            <Button className="m-1 mb-2" type="button" style={{width: "8rem"}} onClick={() => navigate(`/listings/create`)}>Add Listing</Button>
          </Row>
          {listings.map((listing) => (
            <Listing listing={listing} key={listing.id} user={user} userFavorites={userFavorites}/>
          ))}
        </Row>
      </Container>
    </>
    )
  }