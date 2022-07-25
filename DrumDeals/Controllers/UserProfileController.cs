using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using DrumDeals.Models;
using DrumDeals.Repositories;

namespace DrumDeals.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }
        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_userProfileRepository.GetAllUsers());
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.IsAdmin = false;
            userProfile.IsActive = true;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }
        [HttpGet("userCheck/{userId}")]
        public IActionResult UserCheck(int userId)
        {
            UserProfile currentUser = GetCurrentUserProfile();
            if (currentUser.Id != userId)
            {
                return Unauthorized();
            }
            return Ok();
        }
        [HttpGet("GetCurrentUserInfo")]
        public IActionResult CurrentUser()
        {
            UserProfile currentUser = GetCurrentUserProfile();
            currentUser.FirebaseUserId = "nope, you can't see dis.";
            return Ok(currentUser);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }

}
