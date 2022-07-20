using DrumDeals.Models;
using DrumDeals.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

namespace DrumDeals.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ListingController : ControllerBase
    {
        private readonly IListingRepository _listingRepository;
        public ListingController(IListingRepository listingRepository)
        {
            _listingRepository = listingRepository;
        }

        [HttpGet]
        public ActionResult Get()
        {
            List<Listing> listings = _listingRepository.GetAllListings();
            if (listings.Count == 0)
            {
                return NotFound();
            }
            return Ok(listings);
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            Listing listing = _listingRepository.GetListingById(id);
            if (listing == null)
            {
                return NotFound();
            }
            return Ok(listing);
        }
        [HttpPost]
        public IActionResult Post(Listing listing)
        {
            listing.PublishDate = DateTime.Now;
            listing.EndDate = null;
            _listingRepository.Add(listing);
            return CreatedAtAction(
                nameof(Get),
                new { id = listing.Id },
                listing);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Listing listing)
        {
            if (id != listing.Id)
            {
                return BadRequest();
            }

            _listingRepository.Update(listing);

            return NoContent();
        }
    }
}
