﻿using DrumDeals.Repositories;
using DrumDeals.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace DrumDeals.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserFavoriteController : ControllerBase
    {
        private readonly IUserFavoriteRepository _userFavoriteRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IListingRepository _listingRepository;
        public UserFavoriteController(IUserFavoriteRepository userFavoriteRepository, IUserProfileRepository userProfileRepository, IListingRepository listingRepository)
        {
            _userFavoriteRepository = userFavoriteRepository;
            _userProfileRepository = userProfileRepository;
            _listingRepository = listingRepository;
        }

        [HttpPost]
        public IActionResult Post(UserFavorite userFavorite)
        {
            _userFavoriteRepository.AddFavorite(userFavorite);
            return Ok();
        }
        [HttpGet("listing/{id}")]
        public IActionResult GetListingFavorites(int id)
        {
            return Ok(_userFavoriteRepository.GetFavoritesByListingId(id));
        }
        [HttpGet("favorites")]
        public IActionResult GetUserFavs()
        {
            UserProfile user = GetCurrentUserProfile();
            return Ok(_userFavoriteRepository.GetFavoritesByUserId(user.Id));
        }

        [HttpDelete("{listingId}")]
        public IActionResult Delete(int listingId)
        {
            UserProfile user = GetCurrentUserProfile();
            _userFavoriteRepository.DeleteFavorite(listingId, user.Id);
            return NoContent();
        }
        [HttpGet("favoritelistings")]
        public IActionResult Get()
        {
            UserProfile user = GetCurrentUserProfile();
            List<Listing> listings = _userFavoriteRepository.GetFavoriteListingsByUserId(user.Id);
            if (listings.Count == 0)
            {
                return NotFound();
            }
            return Ok(listings);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
