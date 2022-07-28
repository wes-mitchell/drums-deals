import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteListing, getListingById } from "../../modules/listingsManager";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Container, Row, Form, FormGroup, Label} from "reactstrap"
import { formatDate } from "../../helpers";


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
    imageUrl: '',
    userProfile: {
      firstName: ''
    }
  }
)

const handleDelete = () => {
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
  <>
    <Row className="text-center">
      <h4>Are you sure you'd like to delete this listing?</h4>
    </Row>
    <div style={{display: "flex", justifyContent: "center"}}>
      <Card style={{ width: '18rem'}}>
        <CardBody>
        <CardTitle tag="h5" className="text-center">
            <Link to={`/listings/details/${listing.id}`}>
              <b>{listing.title}</b>
            </Link>
          </CardTitle>
          <hr/>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          <b style={{color: "black"}}>Description:</b><br/>
          {listing.description}
        </CardSubtitle>
        <CardText>
          <b>Condition:</b> {listing.condition} <br/>
          <b>Price:</b> ${listing.price} <br/>
          <b>Listed On:</b> {formatDate(listing.publishDate)} <br/>
        </CardText>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Button color="danger" type="button" onClick={handleDelete}>
            Delete
          </Button>
          <Button color="secondary" type="button" onClick={() => navigate(`/listings/mylistings`)}>
            Cancel
          </Button>
        </div>
        </CardBody>
      </Card>
    </div>
  </>
  )
}