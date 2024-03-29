import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingById } from "../../modules/listingsManager";
import { getCurrentUser } from "../../modules/userProfileManager";
import { Card, CardBody, ButtonGroup, CardTitle, CardHeader, CardSubtitle, CardText, Button, CardImg, CardLink, CardFooter, Container } from "reactstrap"
import { formatDate } from "../../helpers";
import './Listing.css'

export const ListingDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState({
    id: '',
    firstName: ''
  })
  const [listing, setListing] = useState({
    id: id,
    title: '',
    condition: '',
    location: '',
    description: '',
    price: '',
    publishDate: '',
    categoryId: 0,
    imageUrl: '',
    category: {
      id: 0,
      name: ''
    }
  }
) 

const getUser = () => {
  getCurrentUser()
  .then(user => setUser(user))
}

const getListing = () => {
  getListingById(id)
    .then(listing => setListing(listing))
}

useEffect(() => {
  getListing()
  getUser()
}, [])

  return (
    <Container style={{display: "flex", justifyContent: "center"}} className="mt-1">
      <Card color="light" style={{width: '30rem'}} className="m-1">
      <CardBody>
        <CardHeader>
          <CardTitle tag="h5" className="text-center">
              <b>{listing.title}</b>
          </CardTitle>
        </CardHeader>
      </CardBody>
      <Container style={{width: '100%', height: '25rem', display: 'flex'}}>
        <CardImg alt="listing thumbnail" src={listing.imageUrl} style={{width: '100%'}} />
      </Container>
        <CardBody>
          <CardText className="my-2">
            <b>Description</b> <br/>
              {listing.description}
              <br/>
            <hr/>
            <b>Condition:</b> {listing.condition} <br/>
            <b>Price:</b> ${listing.price} <br/>
            <b>Listed On:</b> {formatDate(listing.publishDate)} <br/> 
            <b>Seller:</b> {user.firstName}<br/>
          </CardText>
        </CardBody>
        { (user.id === listing.userProfileId) ? 
        <CardBody>  
          <div className="listingDetailsButtons" style={{display: "flex", flexDirection: "row", justifyContent: 'space-between'}}>
            <Button type='button' onClick={() => navigate(`/listings/edit/${listing.id}`)}>
              Edit
            </Button>
            <Button type='button' color="danger" onClick={() => navigate(`/listings/delete/${listing.id}`)}>
              Delete Listing
            </Button>
          </div>
        </CardBody>
        : 
        ''
        }
    </Card>
  </Container>
  )
}

