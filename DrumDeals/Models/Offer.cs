namespace DrumDeals.Models
{
    public class Offer
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int ListingId { get; set; }
        public decimal OfferAmount { get; set; }
        public bool Accepted { get; set; }    
        public UserProfile UserProfile { get; set; }
        public Listing Listing { get; set; }
    }
}
