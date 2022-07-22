using DrumDeals.Models;
using DrumDeals.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Security.Claims;

namespace DrumDeals.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ListingController : ControllerBase
    {
        private readonly IListingRepository _listingRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public ListingController(IListingRepository listingRepository, IUserProfileRepository userProfileRepository)
        {
            _listingRepository = listingRepository;
            _userProfileRepository = userProfileRepository;
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
        [HttpGet("userlistings")]
        public IActionResult GetUserListings()
        {
            var currentUser = GetCurrentUserProfile();
            List<Listing> listings = _listingRepository.GetListingsByUserId(currentUser.Id);
            if (listings.Count == 0)
            {
                return NotFound();
            };
            return Ok(listings);
        }
        [HttpGet("homepage")]
        public ActionResult GetHomePageListings()
        {
            List<Listing> listings = _listingRepository.GetHomePageListings();
            if (listings.Count == 0)
            {
                return NotFound();
            }
            return Ok(listings);
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

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _listingRepository.Delete(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
