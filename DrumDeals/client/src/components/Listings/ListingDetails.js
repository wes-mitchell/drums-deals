import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingById } from "../../modules/listingsManager";
import { Card, CardBody, Container, Row, Col, CardTitle, ListGroup, ListGroupItem, Button } from "reactstrap"
import { formatDate } from "../../helpers";

export const ListingDetails = () => {
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
    publishDate: '',
    categoryId: 0,
    imageUrl: '',
    category: {
      id: 0,
      name: ''
    }
  }
)

  const getListing = () => {
    getListingById(id)
      .then(listing => setListing(listing))
      .then(() => setIsLoading(false))
  }

  useEffect(() => {
    getListing()
  }, [])

  return (
    <Container fluid>
      <Row>
        <Col  sm="3">
          <Card className="text-center">
            <CardBody>
              <CardTitle tag="h5">
                {listing.title}
              </CardTitle>
              <img src={listing.imageUrl} fluid alt="listing image" width='150' className='img-thumbnail' height="150" />
            </CardBody>
            </Card>
            <Card>
            <CardBody>
              <ListGroup flush>
                <ListGroupItem>
                  <strong>Condition:</strong> {listing.condition} 
                </ListGroupItem>
                <ListGroupItem>
                <strong>Location:</strong> {listing.location} 
                </ListGroupItem>
                <ListGroupItem>
                <strong>Category:</strong> {listing.category.name} 
                </ListGroupItem>
                <ListGroupItem>
                <strong>Price:</strong> ${listing.price} 
                </ListGroupItem>
                <ListGroupItem>
                <strong>Listed On:</strong> {formatDate(listing.publishDate)} 
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col size="md" sm="5">
          <Card>
            <CardBody>
              {listing.description}
            </CardBody>
          </Card>
          <Card>
            <CardBody className="details-buttons">
              <Button type='button' onClick={() => navigate(`/listings/edit/${id}`)}>Update Listing</Button>
              <Button type='button' onClick={() => navigate(`/listings/delete/${id}`)}>Delete Listing</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

