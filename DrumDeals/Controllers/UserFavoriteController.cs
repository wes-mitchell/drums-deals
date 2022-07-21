using DrumDeals.Repositories;
using DrumDeals.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DrumDeals.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFavoriteController : ControllerBase
    {
        private readonly IUserFavoriteRepository _userFavoriteRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public UserFavoriteController(IUserFavoriteRepository userFavoriteRepository, IUserProfileRepository userProfileRepository)
        {
            _userFavoriteRepository = userFavoriteRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpPost]
        public IActionResult Post(UserFavorite userFavorite)
        {
            _userFavoriteRepository.AddFavorite(userFavorite);
            return Ok();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
