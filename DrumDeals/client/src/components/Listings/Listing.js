import React from "react";
import { Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom";

export const Listing = ({ }) => {
const listing = {
  id: 1,
  title: "Tama Swingstar",
  condition: "Used",
  price: 30.99,
  publishDate: "this is a date",
  userProfile: {
    id: 1,
    name: "Joe"
  }
}
  return (
    <Card >
    <p className="text-left px-2">From: {listing.userProfile.firstName}</p>
    <CardBody>
      <p>
        <Link to={`/details/${listing.id}`}>
        <strong>{listing.title}</strong>
        </Link>
      </p>
      <p>{listing.condition}</p>
      <p>{listing.price}</p>
      <p>{listing.publishDate}</p>
      <Link to={`/listings/details/${listing.id}`}>
        See Details
      </Link>
      <Link to={`/listings/edit/${listing.id}`}>
        Edit
      </Link>
      <br/>
      <Link to={`/listings/delete/${listing.id}`}>
        Delete Video
      </Link>
    </CardBody>
  </Card>
  )
} 