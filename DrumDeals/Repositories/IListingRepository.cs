using DrumDeals.Models;
using System.Collections.Generic;

namespace DrumDeals.Repositories
{
    public interface IListingRepository
    {
        List<Listing> GetAllListings();
        Listing GetListingById(int id);
        void Add(Listing listing);
        void Update(Listing listing);
        void Delete(int id);
    }
}
