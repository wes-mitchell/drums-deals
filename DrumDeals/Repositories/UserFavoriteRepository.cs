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

        public List<UserFavorite> GetFavoritesByListingId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM UserFavorite WHERE ListingId = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        List<UserFavorite> favorites = new List<UserFavorite>();
                        while (reader.Read())
                        {
                            UserFavorite favorite = new UserFavorite
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ListingId = DbUtils.GetInt(reader, "ListingId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                            };
                            favorites.Add(favorite);
                        }
                        return favorites;
                    }
                }
            }
        }
        public List<UserFavorite> GetFavoritesByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM UserFavorite WHERE UserProfileId = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        List<UserFavorite> favorites = new List<UserFavorite>();
                        while (reader.Read())
                        {
                            UserFavorite favorite = new UserFavorite
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ListingId = DbUtils.GetInt(reader, "ListingId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                            };
                            favorites.Add(favorite);
                        }
                        return favorites;
                    }
                }
            }
        }

        public void DeleteFavorite(int listingId, int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                                        DELETE FROM UserFavorite
                                        WHERE ListingId = @listingId AND UserProfileId = @userId";
                        DbUtils.AddParameter(cmd, "@listingId", listingId);
                        DbUtils.AddParameter(cmd, "@userId", userId);
                        cmd.ExecuteNonQuery();
                    }
                }

            }
        }

        public List<Listing> GetFavoriteListingsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                                    SELECT uf.Id, uf.UserProfileId AS UserFavoriteProfileId, uf.ListingId,
                                    l.Id as ListingId, l.Title, l.Condition, l.Location, l.Description, l.Price, l.CategoryId, l.PublishDate, l.EndDate, l.ImageUrl, 
		                                    up.Id as UserProfileId, up.FirstName, up.LastName, up.Email, up.IsAdmin, up.IsActive,
		                                    c.Id, c.Name
                                    FROM UserFavorite uf
                                    JOIN Listing l ON l.Id = uf.ListingId
                                    JOIN UserProfile up ON up.Id = l.UserProfileId
                                    JOIN Category c ON c.Id = l.CategoryId
                                    WHERE uf.UserProfileId = @userId";

                        DbUtils.AddParameter(cmd, "userId", userId);

                        using (var reader = cmd.ExecuteReader())
                        {
                            List<Listing> listings = new List<Listing>();
                            {
                                while (reader.Read())
                                {
                                    Listing listing = new Listing
                                    {  
                                        Id = DbUtils.GetInt(reader, "ListingId"),
                                        Title = DbUtils.GetString(reader, "Title"),
                                        Condition = DbUtils.GetString(reader, "Condition"),
                                        UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                        Location = DbUtils.GetString(reader, "Location"),
                                        Description = DbUtils.GetString(reader, "Description"),
                                        Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                                        CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                        PublishDate = DbUtils.GetDateTime(reader, "PublishDate"),
                                        EndDate = DbUtils.GetNullableDateTime(reader, "EndDate"),
                                        ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                        Category = new Category
                                        {
                                            Id = DbUtils.GetInt(reader, "CategoryId"),
                                            Name = DbUtils.GetString(reader, "Name")
                                        },
                                        UserProfile = new UserProfile
                                        {
                                            Id = DbUtils.GetInt(reader, "UserProfileId"),
                                            FirstName = DbUtils.GetString(reader, "FirstName"),
                                            LastName = DbUtils.GetString(reader, "LastName"),
                                            Email = DbUtils.GetString(reader, "Email"),
                                            IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("IsAdmin"))
                                        }
                                    };
                                    listings.Add(listing);
                                }
                                return listings;
                            }
                        }
                    }
                }
            }
        }
    }
}
