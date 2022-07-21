using DrumDeals.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using DrumDeals.Utils;

namespace DrumDeals.Repositories
{
    public class UserFavoriteRepository : BaseRepository, IUserFavoriteRepository
    {
        public UserFavoriteRepository(IConfiguration configuration) : base(configuration)
        {

        }
        public void AddFavorite(UserFavorite userFavorite)
        {
            using (var conn = Connection)
            {
                conn.Open();
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                                          INSERT INTO UserFavorite (UserProfileId, ListingId)
                                          OUTPUT INSERTED.ID
                                          VALUES (@UserProfileId, @ListingId)";
                        DbUtils.AddParameter(cmd, "@UserProfileId", userFavorite.UserProfileId);
                        DbUtils.AddParameter(cmd, "@ListingId", userFavorite.ListingId);
                        userFavorite.Id = (int)cmd.ExecuteScalar();
                    }
                }
            }
        }

        public void DeleteFavorite(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                                        DELETE FROM UserFavorite
                                        WHERE Id = @Id";
                        DbUtils.AddParameter(cmd, "@Id", id);
                        cmd.ExecuteNonQuery();
                    }
                }

            }
        }

        public List<UserFavorite> GetFavoriteListingsByUserId(int userId)
        {
            throw new System.NotImplementedException();
        }
    }
}
