﻿using DrumDeals.Models;
using System.Collections.Generic;
namespace DrumDeals.Repositories
{
        public interface IUserFavoriteRepository
        {
            void AddFavorite(UserFavorite userFavorite);
            void DeleteFavorite(int listingId, int userId);
            List<Listing> GetFavoriteListingsByUserId(int userId);
            List<UserFavorite> GetFavoritesByListingId(int id);
            List<UserFavorite> GetFavoritesByUserId(int id);
        }
}
