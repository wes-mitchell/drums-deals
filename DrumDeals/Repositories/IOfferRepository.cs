using DrumDeals.Models
using System.Collections.Generic;

namespace DrumDeals.Repositories
{
    public interface IOfferRepository
    {
        List<Offer> GetAllOffers();
        Offer GetOfferById(int id);
        List<Offer> GetOffersByUserId(int id);
        List<Offer> GetOffersByListingId(int id);
        void Add(Offer offer);
        void Update(Offer offer);
        void Delete(int id);
    }
}
