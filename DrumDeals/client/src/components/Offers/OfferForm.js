import { useState, useEffect } from "react"
import { Button, Input } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { addOffer } from "../../modules/offerManager"

export const OfferForm = () => {
const [isLoading, setIsLoading] = useState(false)
const [offer, setOffer] = useState({
    listingId: 0,
    offerAmount: 0,
  })

  const navigate = useNavigate()

  const handleFieldChange = (evt) => {
    const newOffer = {...offer}
    const selectedVal = evt.target.value
    newOffer[evt.target.id] = selectedVal
    setOffer(newOffer)
  } 


  const handleSaveOffer = (evt) => {
    evt.preventDefault();

      setIsLoading(true)
      offer.listingId = 1
      offer.offerAmount = parseFloat(offer.offerAmount).toFixed(2)
      addOffer(offer)
      .then(() => navigate('/'))
  }

  return (
    <>
    <Button type="button" onClick={handleSaveOffer}>Send Offer</Button>
    <Input type="text" id="offerAmount" onChange={handleFieldChange} value={offer.offerAmount} placeholder="$ 00.00" maxLength={8} />
    </>
  )
}
