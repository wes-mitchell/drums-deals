import React from "react";
import { Card, CardBody, ButtonGroup } from "reactstrap"
import { Link } from "react-router-dom";
import { Button } from "bootstrap";

export const Listing = ({ listing }) => {


  return (
    <Card>
    <p className="text-left px-2">From: {listing.userProfile.firstName}</p>
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
      <p><strong>Listed On:</strong> {listing.publishDate}</p>
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
      <Link to={`/listings/delete/${listing.id}`}>
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