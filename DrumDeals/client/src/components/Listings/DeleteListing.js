import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteListing, getListingById } from "../../modules/listingsManager";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap"


export const DeleteListing = () => {
const navigate = useNavigate()
const { id } = useParams()
const [isLoading, setIsLoading] = useState(true)
const [listing, setListing] = useState({
    id: id,
    title: '',
    condition: '',
    location: '',
    description: '',
    price: '',
    categoryId: 0,
    imageUrl: ''
  }
)

const handleDelete = () => {
  console.log(listing)
  deleteListing(listing)
  .then(() => navigate(`/listings`))
}

const getListing = () => {
  getListingById(id)
  .then(listing => setListing(listing))
  .then(setIsLoading(false))
}

useEffect(() => {
  getListing()
}, [])

  return (
  <Card
    style={{
      width: '18rem'
    }}
  >
  <CardBody>
    <CardTitle tag="h5">
      {listing.title}
    </CardTitle>
    <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
      {listing.description}
    </CardSubtitle>
    <CardText>
      {listing.description}
    </CardText>
    <Button type="button" onClick={handleDelete}>
      Delete
    </Button>
    <Button type="button" onClick={() => navigate(`/listings/mylistings`)}>
      Cancel
    </Button>
  </CardBody>
</Card>
  )
}