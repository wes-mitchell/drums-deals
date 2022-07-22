using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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

        [DataType(DataType.DateTime)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime PublishDate { get; set; }

        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:MM-dd-yyyy}")]
        public DateTime? EndDate { get; set; }

        public string ImageUrl { get; set; }
        public Category Category { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
