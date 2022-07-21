using DrumDeals.Models;
using System.Collections.Generic;
namespace DrumDeals.Repositories
{
        public interface IUserFavoriteRepository
        {
            void AddFavorite(UserFavorite userFavorite);
            void DeleteFavorite(int id);
            public List<UserFavorite> GetFavoriteListingsByUserId(int userId);
        }
}
