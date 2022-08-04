using DrumDeals.Models;
using DrumDeals.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DrumDeals.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OfferController : ControllerBase
    {
        private readonly IOfferRepository _offerRepository;
        private readonly IListingRepository _listingRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public OfferController(IOfferRepository offerReop, IListingRepository listingRepo, IUserProfileRepository userProfileRepo)
        {
            _offerRepository = offerReop;
            _listingRepository = listingRepo;
            _userProfileRepository = userProfileRepo;
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Offer offer = _offerRepository.GetOfferById(id);
            if (offer == null)
            {
                return NotFound();
            }
            return Ok(offer);
        }

        [HttpPost]
        public IActionResult Post(Offer offer)
        {
            var currentUser = GetCurrentUserProfile();
            offer.UserProfileId = currentUser.Id;
            offer.Accepted = false;
            _offerRepository.Add(offer);
            return CreatedAtAction(nameof(Get), new { id = offer.Id }, offer);
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
