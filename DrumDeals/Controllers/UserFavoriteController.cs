using DrumDeals.Repositories;
using DrumDeals.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Collections.Generic;

namespace DrumDeals.Controllers
{
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

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userFavoriteRepository.DeleteFavorite(id);
            return NoContent();
        }
        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            List<Listing> listings = _userFavoriteRepository.GetFavoriteListingsByUserId(userId);
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
