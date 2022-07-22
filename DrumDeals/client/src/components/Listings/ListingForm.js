import { useEffect, useState } from "react";
import { getAllCategories } from "../../modules/categoryManager";
import { useNavigate } from "react-router";
import { addListing } from "../../modules/listingsManager";
import { Form, FormGroup, Label, Input, Button} from "reactstrap";

export const ListingForm = () => {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [listing, setListing] = useState({
    title: '',
    condition: '',
    location: '',
    description: '',
    price: '',
    categoryId: 0,
    imageUrl: ''
    }
  )

  const handleFieldChange = (evt) => {
    const newListing = {...listing}
    let selectedVal  = evt.target.value
    newListing[evt.target.id] = selectedVal
    setListing(newListing)
  }

  const handleSaveListing = (evt) => {
    evt.preventDefault();

    if (listing.title === '' || listing.condtition === '' || listing. location === '' || listing.price === '') {
      window.alert("Whoops, make sure you fill out all fields")
      setIsLoading(false)
    } else {
      setIsLoading(true)
      listing.categoryId = parseInt(listing.categoryId)
      listing.price = parseFloat(listing.price).toFixed(2)
      addListing(listing)
      .then(() => navigate('/listings/mylistings'))
    }
  }

  const getCategories = () => {
    getAllCategories()
    .then(categories => setCategories(categories))
    .then(setIsLoading(false))
  }

useEffect(() => {
  getCategories()
}, [])

return (
  <Form>
    <h3>Create a Listing</h3>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="text" name="title" id="title" onChange={handleFieldChange} value={listing.title} />
    </FormGroup>
    <FormGroup>
      <Label for="condition">Condition</Label>
      <Input type="text" name="condition" id="condition" onChange={handleFieldChange} value={listing.condition}/>
    </FormGroup>
    <FormGroup>
      <Label for="location">Location</Label>
      <Input type="text" name="location" id="location" onChange={handleFieldChange} value={listing.location}/>
    </FormGroup>
    <FormGroup>
      <Label for="descripion">Description</Label>
      <Input type="textarea" name="description" id="description" onChange={handleFieldChange} value={listing.description}/>
    </FormGroup>
    <FormGroup>
      <Label for="price">Price</Label>
      <Input type="text" name="price" id="price" onChange={handleFieldChange} value={listing.price} placeholder="$ 00.00" maxLength={8} />
    </FormGroup>
    <FormGroup>
      <Label for="Category">Category</Label>
      <Input type="select" name="description" id="categoryId" onChange={handleFieldChange} value={listing.categoryId} data-dropup-auto="false">
      <option value="0">Select a Category</option>
      {categories.map(cat => (
        <option value={cat.id} key={cat.id}>
          {cat.name}
        </option>
      ))}
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="imageUrl">Image URL</Label>
      <Input type="text" name="imageUrl" id="imageUrl" onChange={handleFieldChange} value={listing.imageUrl} />
    </FormGroup>
    <Button onClick={handleSaveListing} color="success">Save Listing</Button>
  </Form>
  )
}