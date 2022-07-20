using System;

namespace DrumDeals.Models
{
    public class Listing
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Condition { get; set; }
        public int UserProfileId { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public DateTime PublishDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string ImageUrl { get; set; }
    }
}
