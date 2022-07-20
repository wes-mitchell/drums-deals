﻿using DrumDeals.Models;
using DrumDeals.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace DrumDeals.Controllers
{
    [Authorize]
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
    }
}
