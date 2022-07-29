import { useEffect, useState } from "react";
import { getAllCategories } from "../../modules/categoryManager";
import { useNavigate } from "react-router";
import { addListing } from "../../modules/listingsManager";
import { uploadImageToCloudinary } from "../../modules/imageManager";
import { Form, FormGroup, Label, Input, Button, Container} from "reactstrap";

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

  const buttonRender = () => {
    if (listing.title === '' || listing.condition === '' || listing. location === '' || listing.price === '' || listing.categoryId === 0 || listing.imageUrl === '') {
      return <Button color="primary" disabled>Save Listing</Button>
    } else {
      return <Button onClick={handleSaveListing} color="primary" active>Save Listing</Button>
    }
  }

  const handleFieldChange = (evt) => {
    const newListing = {...listing}
    let selectedVal  = evt.target.value
    newListing[evt.target.id] = selectedVal
    setListing(newListing)
  }

  const handleSaveListing = (evt) => {
    evt.preventDefault();

      setIsLoading(true)
      listing.categoryId = parseInt(listing.categoryId)
      listing.price = parseFloat(listing.price).toFixed(2)
      addListing(listing)
      .then(() => navigate('/listings/mylistings'))
  }

  const getCategories = () => {
    getAllCategories()
    .then(categories => setCategories(categories))
    .then(setIsLoading(false))
  }
  
  const uploadImage = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "drumdeals");

    const res = await uploadImageToCloudinary(data);
    const file = await res.json();
    listing.imageUrl = file.secure_url;
    setIsLoading(false);
  };

useEffect(() => {
  getCategories()
}, [])

return (
  <Container style={{maxWidth: "25rem"}}>
    <Form className="m-1">
      <Container className="text-center">
        <h3>Create a Listing</h3>
      </Container>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input bsSize="sm" type="text" name="title" id="title" onChange={handleFieldChange} value={listing.title} />
    </FormGroup>
    <FormGroup>
      <Label for="descripion">Description</Label>
      <Input bsSize="sm" type="textarea" name="description" id="description" onChange={handleFieldChange} value={listing.description}/>
    </FormGroup>
    <FormGroup className="imageUploader">
      <Label for='imageUrl'>Upload an Image</Label>
      <Input type="file" name="file" placeholder="Upload an Image" onChange={(e) => uploadImage(e)}/>
    </FormGroup>
    <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
      <FormGroup>
        <Label for="condition">Condition</Label>
        <Input style={{maxWidth: "10rem"}} bsSize="sm" type="text" name="condition" id="condition" onChange={handleFieldChange} value={listing.condition}/>
      </FormGroup>
      <FormGroup>
        <Label for="location">Location</Label>
        <Input style={{maxWidth: "10rem"}} bsSize="sm" type="text" name="location" id="location" onChange={handleFieldChange} value={listing.location}/>
      </FormGroup>
    </div>
    <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
      <FormGroup>
        <Label for="price">Price</Label>
        <Input style={{maxWidth: "10rem"}} bsSize="sm" type="text" name="price" id="price" onChange={handleFieldChange} value={listing.price} placeholder="$ 00.00" maxLength={8} />
      </FormGroup>
      <FormGroup>
        <Label for="Category">Category</Label>
          <Input style={{maxWidth: "10rem"}} bsSize="sm" type="select" name="description" id="categoryId" onChange={handleFieldChange} value={listing.categoryId} data-dropup-auto="false">
          <option value="0">Select a Category</option>
          {categories.map(cat => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
          </Input>
      </FormGroup>
    </div>
    { buttonRender() }
  </Form>
  </Container>
  )
}