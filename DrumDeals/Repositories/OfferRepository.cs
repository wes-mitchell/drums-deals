using Microsoft.Extensions.Configuration;
using DrumDeals.Models;
using System.Collections.Generic;
using DrumDeals.Utils;

namespace DrumDeals.Repositories
{
    public class OfferRepository : BaseRepository, IOfferRepository
    {
        public OfferRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(Offer offer)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new System.NotImplementedException();
        }

        public List<Offer> GetAllOffers()
        {
            throw new System.NotImplementedException();
        }

        public Offer GetOfferById(int id)
        {
            throw new System.NotImplementedException();
        }

        public List<Offer> GetOffersByListingId(int id)
        {
            throw new System.NotImplementedException();
        }

        public List<Offer> GetOffersByUserId(int id)
        {
            throw new System.NotImplementedException();
        }

        public void Update(Offer offer)
        {
            throw new System.NotImplementedException();
        }
    }
}
