using DrumDeals.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DrumDeals.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OfferController : ControllerBase
    {
        private readonly IOfferRepository _offerRepository;
        private readonly IListingRepository _listingRepository;

        public OfferController(IOfferRepository offerReop, IListingRepository listingRepo)
        {
            _offerRepository = offerReop;
            _listingRepository = listingRepo;
        }
    }
}
