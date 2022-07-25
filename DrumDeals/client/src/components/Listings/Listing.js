import React from "react";
import { useState, useEffect } from "react";
import { Card, CardBody, ButtonGroup } from "reactstrap"
import { getFavoritesByListingId } from "../../modules/favoritesManager";
import { getCurrentUser } from "../../modules/userProfileManager";
import { Link } from "react-router-dom";
import { formatDate } from "../../helpers";

export const Listing = ({ listing, user, userFavorites }) => {

  const displayFavorite = () => {
    if (userFavorites.find(fav => fav.listingId === listing.id)) {
      return (
        <div>
          <i class="fa-solid fa-star"></i>
        </div>
      );
    } else {
      return (
        <div>
          <i class="fa-regular fa-star"></i>
        </div>
      );
    }
  };


//  const handleFavoriteClick = () => {
//     if (favoriteCheck() === true) {
//       setFavorited(true)
//     }
//   }

//   useEffect(() => {
//     getFavorites()
//     handleFavoriteClick()
//   }, [])

  return (
    <Card>
    <CardBody>
      { displayFavorite() }
    <div className="content-container">
      <div>
      <p>
        <Link to={`/listings/details/${listing.id}`}>
        <strong>{listing.title}</strong>
        </Link>
      </p>
      <img
      src={listing.imageUrl}
      className='img-thumbnail'
      alt='...'
      style={{ maxWidth: '24rem' }}
    />
      <p><strong>Condition:</strong> {listing.condition}</p>
      <p><strong>Price:</strong> ${listing.price}</p>
      <p><strong>Listed On:</strong> {formatDate(listing.publishDate)}</p>
      <p><strong>Seller:</strong> {listing.userProfile.firstName}</p>
      </div>
      <div>
      <ButtonGroup>
        <button type="button" class="btn btn-outline-light">
          <Link to={`/listings/details/${listing.id}`}>
            See Details
          </Link>
        </button>
        <button type="button" className="btn btn-outline-light">
      <Link className="edit-button" to={`/listings/edit/${listing.id}`}>
        Edit
      </Link>
      </button>
      <button type="button" className="btn btn-outline-light">
      <Link to={`/listings/delete/${listing.id}`} listing={listing}>
        Delete Listing
      </Link>
      </button>
      </ButtonGroup>
      </div>
      </div>
    </CardBody>
  </Card>
  )
} 