import React from "react";
import { useState, useEffect } from "react";
import { Card, CardBody, ButtonGroup, CardTitle, CardHeader, CardSubtitle, CardText, Button, CardImg, CardLink, CardFooter } from "reactstrap"
import { Link } from "react-router-dom";
import { addFavorite, deleteFavorite } from "../../modules/favoritesManager";
import { formatDate } from "../../helpers";
import './Listing.css'


export const Listing = ({ listing, user, userFavorites, render, setRender }) => {

const handleAddFavorite = (evt) => {
  evt.preventDefault()
  const userFavorite = {
    userProfileId: user.id,
    listingId: listing.id
  }
  addFavorite(userFavorite)
  .then(() => setRender(render + 1))
}

const handleDeleteFavorite = (evt) => {
  evt.preventDefault()
  deleteFavorite(listing.id)
  .then(() => setRender(render + 2))
}


const displayFavorite = () => {
  if (user.id === listing.userProfileId) {
    return (
      <p></p>
    )
  }
  else if (userFavorites.find(fav => fav.listingId === listing.id)) {
    return (
      <div className="bggray2 text-warning">
        <i className="fa-solid fa-star fa-xl" onClick={handleDeleteFavorite}></i>
      </div>
    );
  } else {
    return (
      <div className="bggray2 text-warning">
        <i className="fa-regular fa-star fa-xl" onClick={handleAddFavorite}></i>
      </div>
    );
  }
};



  return (
    <Card color="light" style={{width: '18rem'}} className="m-1">
      <CardBody>
        <CardHeader>
          <CardTitle tag="h5" className="text-center">
            <Link to={`/listings/details/${listing.id}`}>
              <b>{listing.title}</b>
            </Link>
          </CardTitle>
        </CardHeader>

          <CardImg alt="listing thumbnail" src={listing.imageUrl} style={{width: '100%'}} />

        </CardBody>
        
        <CardBody>
          <CardText className="my-2">
            <b>Condition:</b> {listing.condition} <br/>
            <b>Price:</b> ${listing.price} <br/>
            <b>Listed On:</b> {formatDate(listing.publishDate)} <br/>
            <b>Seller:</b> {listing.userProfile.firstName} <br/>
          </CardText>
        </CardBody>
        { (user.id === listing.userProfileId) ? 
        <CardBody>  
          <div className="listingButtons" style={{display: "flex", flexDirection: "row"}}>
            <CardLink href={`/listings/details/${listing.id}`}>
              See Details
            </CardLink>
            <CardLink href={`/listings/edit/${listing.id}`}>
              Edit
            </CardLink>
            <CardLink className="text-sm" href={`/listings/delete/${listing.id}`}>
              Delete Listing
            </CardLink>
          </div>
        </CardBody>  
        :
        <CardBody>
          <div className="listingButtons">
            <CardLink href={`/listings/details/${listing.id}`}>
              See Details
            </CardLink>
            <CardText className="m-1">
              { displayFavorite() }
            </CardText>
          </div>
          
        </CardBody>
        }
    </Card>
  )
} 