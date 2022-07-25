import React from "react";
import { Card, CardBody, ButtonGroup } from "reactstrap"
import { Link } from "react-router-dom";
import { formatDate } from "../../helpers";

export const Listing = ({ listing, user }) => {
  
  return (
    <Card>
      <CardBody>
      <div className="content-container">
        <div>
        <p>
          <Link to={`/details/${listing.id}`}>
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
          <button type="button" className="btn btn-outline-light">
            <Link to={`/listings/details/${listing.id}`} listing={listing}>
              See Details
            </Link>
          </button>
          {listing.userProfile.id === user.id ?
          <button type="button" className="btn btn-outline-light">
            <Link className="edit-button" to={`/listings/edit/${listing.id}`}>
              Edit
            </Link>
          </button> : ''}
        {listing.userProfile.id === user.id ?
        <button type="button" className="btn btn-outline-light">
          <Link to={`/listings/delete/${listing.id}`} listing={listing}>
            Delete Listing
          </Link>
        </button> 
        : ''}
        </ButtonGroup>
        </div>
        </div>
      </CardBody>
    </Card>
  )
} 