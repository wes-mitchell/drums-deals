using DrumDeals.Models;
using DrumDeals.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace DrumDeals.Repositories
{
    public class ListingRepository : BaseRepository, IListingRepository
    {
        public ListingRepository(IConfiguration configuration) : base(configuration) { }

        public List<Listing> GetAllListings()
        {
            List<Listing> listings = new List<Listing>();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT l.Id as ListingId, l.Title, l.Condition, l.Location, l.Description, l.Price, l.CategoryId, l.PublishDate, l.EndDate, l.ImageUrl, 
		                                       up.Id as UserProfileId, up.FirstName, up.LastName, up.Email, up.IsAdmin, up.IsActive,
		                                       c.Id, c.Name 
                                        FROM Listing l
                                        JOIN UserProfile up ON up.Id = l.UserProfileId
                                        JOIN Category c ON c.Id = l.CategoryId";

                    var reader = cmd.ExecuteReader();

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
                    reader.Close();
                    return listings;
                }
            }
        }

        public void Add(Listing listing)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new System.NotImplementedException();
        }

        public Listing GetListingById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT l.Id as ListingId, l.Title, l.Condition, l.Location, l.Description, l.Price, l.CategoryId, l.PublishDate, l.EndDate, l.ImageUrl, 
		                                       up.Id as UserProfileId, up.FirstName, up.LastName, up.Email, up.IsAdmin, up.IsActive,
		                                       c.Id, c.Name 
                                        FROM Listing l
                                        JOIN UserProfile up ON up.Id = l.UserProfileId
                                        JOIN Category c ON c.Id = l.CategoryId
                                        WHERE l.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    // sets null to check in controller if no listing is found
                    Listing listing = null;

                    if (reader.Read())
                    {
                        listing = new Listing
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
                    }
                    reader.Close();
                    return listing;
                }
            }
        }

        public void Update(Listing listing)
        {
            throw new System.NotImplementedException();
        }
    }
}
