import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getListingById } from "../../modules/listingsManager";
import { getAllCategories } from "../../modules/categoryManager";
import { Form, FormGroup, Label, Input, Button, Modal, Container} from "reactstrap";
import { updateListing } from "../../modules/listingsManager";

export const EditListingForm = () => {
  const navigate = useNavigate()
  const [loading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [listing, setListing] = useState({
    title: '',
    condition: '',
    location: '',
    description: '',
    price: '',
    categoryId: 0,
    imageUrl: ''
  })

  const { id } = useParams()

  const handleFieldChange = (evt) => {
    const editedListing = {...listing}
    let selectedVal  = evt.target.value
    editedListing[evt.target.id] = selectedVal
    setListing(editedListing)
  }

  const handleUpdateListing = (evt) => {
    evt.preventDefault();

    if (listing.title === '' || listing.condition === '' || listing. location === '' || listing.price === '' || listing.categoryId === "0") {
      window.alert("Whoops, make sure you fill out all fields")
      setIsLoading(false)
    } else {
      setIsLoading(true)
      listing.categoryId = parseInt(listing.categoryId)
      listing.price = parseFloat(listing.price).toFixed(2)
      updateListing(listing)
      .then(() => navigate('/listings/mylistings'))
    }
  }

  const getListing = () => {
    getListingById(id)
    .then(listing => setListing(listing))
    .then(setIsLoading(false))
  }

  const getCategories = () => {
    getAllCategories()
    .then(categories => setCategories(categories))
    .then(setIsLoading(false))
  }

  useEffect(() => {
    getListing()
  }, [])

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Container style={{maxWidth: "25rem"}}>
      <Form className="m-1">
        <Container className="text-center">
          <h3>Update Your Listing</h3>
        </Container>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" onChange={handleFieldChange} value={listing.title} />
        </FormGroup>
        <FormGroup>
          <Label for="descripion">Description</Label>
          <Input type="textarea" name="description" id="description" rows="5" onChange={handleFieldChange} value={listing.description}/>
        </FormGroup>
        <FormGroup>
          <Label for="imageUrl">Image URL</Label>
          <Input type="text" name="imageUrl" id="imageUrl" onChange={handleFieldChange} value={listing.imageUrl} />
        </FormGroup>
        <FormGroup>
          <Label for="Category">Category</Label>
          <Input style={{maxWidth: "10rem"}} type="select" name="description" id="categoryId" onChange={handleFieldChange} value={listing.categoryId} data-dropup-auto="false">
          {categories.map(cat => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
          </Input>
        </FormGroup>
        <FormGroup >
          <Label for="condition">Condition</Label>
          <Input style={{maxWidth: "10rem"}} type="text" name="condition" id="condition" onChange={handleFieldChange} value={listing.condition}/>
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input style={{maxWidth: "10rem"}} type="text" name="location" id="location" onChange={handleFieldChange} value={listing.location}/>
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input style={{maxWidth: "5rem"}} type="text" name="price" id="price" onChange={handleFieldChange} value={listing.price} placeholder="$ 00.00" maxLength={8} />
        </FormGroup>
        <Button style={{marginRight: "3.5rem"}} onClick={handleUpdateListing} color="primary">Save Listing</Button>
        <Button onClick={() => navigate(`/listings/mylistings`)} color="danger">Cancel</Button>
      </Form>
    </Container>
  )
}