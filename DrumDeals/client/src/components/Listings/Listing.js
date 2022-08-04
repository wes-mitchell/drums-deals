import React from "react";
import { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardHeader, CardText, Button, CardLink, Modal, ModalBody, ModalFooter, Input } from "reactstrap"
import { Link } from "react-router-dom";
import { addFavorite, deleteFavorite } from "../../modules/favoritesManager";
import { formatDate } from "../../helpers";
import { activateListing, deactivateListing } from "../../modules/listingsManager";
import { addOffer } from "../../modules/offerManager";
import './Listing.css'


export const Listing = ({ listing, user, userFavorites, render, setRender }) => {

const [isLoading, setIsLoading] = useState(false)
const [modal, setModal] = useState(false)
const [successModal, setSuccessModal] = useState(false)
const [offer, setOffer] = useState({
  listingId: listing.id,
  offerAmount: 0,
})

const toggle = () => {
    setModal(!modal)
}

const handleFieldChange = (evt) => {
  const newOffer = {...offer}
  const selectedVal = evt.target.value
  newOffer[evt.target.id] = selectedVal
  setOffer(newOffer)
} 

const handleSaveOffer = (evt) => {
  evt.preventDefault();

    setIsLoading(true)
    offer.offerAmount = parseFloat(offer.offerAmount).toFixed(2)
    addOffer(offer)
    setIsLoading(false)
    toggle()
    setSuccessModal(true)
}

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

const handleDeactivateListing = (evt) => {
  evt.preventDefault()
  deactivateListing(listing.id)
  .then(() => setRender(render + 1))
}

const handleReactivateListing = (evt) => {
  evt.preventDefault()
  activateListing(listing.id)
  .then(() => setRender(render + 1))
}

const listingActive = () => {
  if (listing.isActive) {
    return "light"
  } else {
    return "warning"
  }
}

const renderActivateListing = () => {
  if (listing.isActive) {
    return <Button type='button' size='sm' color="danger" onClick={handleDeactivateListing}>Deactivate Listing</Button>
  } else {
    return <Button type='button' size='sm' color='primary' onClick={handleReactivateListing}>Reactivate Listing</Button>
  }
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
    <>
      <Modal isOpen={successModal}>
        <ModalBody>
          <p>Your offer has been sent!</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setSuccessModal(false)}>Continue Browsing</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal}>
        <ModalBody>
          <p>{listing.userProfile.firstName} is asking for <strong>${listing.price}</strong>.</p>
          <p>Enter Your Offer Below:</p>
          <Input autoFocus={true} type="text" id="offerAmount" onChange={handleFieldChange} placeholder={listing.price} maxLength={8} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary"  onClick={handleSaveOffer}>Send Offer</Button>{' '}
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    <Card color={listingActive()} style={{width: '18rem'}} className="m-1">
      <CardBody>
        <CardHeader>
          <CardTitle tag="h5" className="text-center">
            <Link to={`/listings/details/${listing.id}`}>
              <b>{listing.title}</b>
            </Link>
          </CardTitle>
        </CardHeader>

        <div className="cardImageContainer">
          <img className="cardImage" alt="listing thumbnail" src={listing.imageUrl} />
        </div>

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
          <CardText>
            {renderActivateListing()}
          </CardText>
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
            <CardText>
              <div className="purchaseButton">
                { displayFavorite() }
                <Button type="button" size='sm' color="success" className="m-1"onClick={toggle}>Purchase</Button>
              </div>
            </CardText>
            <div className="listingButtons" style={{display: "flex", flexDirection: "row"}}>
              <CardLink href={`/listings/details/${listing.id}`}>
                See Details
              </CardLink>
            </div>
        </CardBody>
        } 
    </Card>
    </>
  )
} 