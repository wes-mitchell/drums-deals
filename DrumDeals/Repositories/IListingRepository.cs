﻿using DrumDeals.Models;
using System.Collections.Generic;

namespace DrumDeals.Repositories
{
    public interface IListingRepository
    {
        List<Listing> GetAllListings();
        Listing GetListingById(int id);
        List<Listing> GetListingsByUserId(int id);
        List<Listing> GetHomePageListings();
        List<Listing> Search(string criterion);
        void Add(Listing listing);
        void Update(Listing listing);
        void Delete(int id);
    }
}
