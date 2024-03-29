﻿using DrumDeals.Models;
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
                                        SELECT l.Id as ListingId, l.Title, l.Condition, l.Location, l.Description, l.Price, l.CategoryId, l.PublishDate, l.EndDate, l.ImageUrl, l.IsActive, l.PurchasePrice,
		                                    up.Id as UserProfileId, up.FirstName, up.LastName, up.Email, up.IsAdmin, up.IsActive,
		                                    c.Id, c.Name 
                                        FROM Listing l
                                        JOIN UserProfile up ON up.Id = l.UserProfileId
                                        JOIN Category c ON c.Id = l.CategoryId
                                        WHERE l.IsActive = 'True'
                                        ORDER BY l.PublishDate DESC";

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
                            }, 
                            IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                            PurchasePrice = reader.GetDecimal(reader.GetOrdinal("PurchasePrice"))
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
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO Listing (Title, Condition, UserProfileId, Location, Description, Price, CategoryId, PublishDate, EndDate, ImageUrl)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Title, @Condition, @UserProfileId, @Location, @Description, @Price, @CategoryId, @PublishDate, @EndDate, @ImageUrl)";
                    DbUtils.AddParameter(cmd, "@Title", listing.Title);
                    DbUtils.AddParameter(cmd, "@Condition", listing.Condition);
                    DbUtils.AddParameter(cmd, "@UserProfileId", listing.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Location", listing.Location);
                    DbUtils.AddParameter(cmd, "@Description", listing.Description);
                    DbUtils.AddParameter(cmd, "@Price", listing.Price);
                    DbUtils.AddParameter(cmd, "@CategoryId", listing.CategoryId);
                    DbUtils.AddParameter(cmd, "@PublishDate", listing.PublishDate);
                    DbUtils.AddParameter(cmd, "@EndDate", listing.EndDate);
                    DbUtils.AddParameter(cmd, "@ImageUrl", listing.ImageUrl);

                    listing.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Listing
                        WHERE Id = @Id;

                        DELETE FROM UserFavorite
                        WHERE ListingId = @Id;

                        DELETE FROM Offer
                        WHERE ListingId = @id;";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Listing GetListingById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT l.Id as ListingId, l.Title, l.Condition, l.Location, l.Description, l.Price, l.CategoryId, l.PublishDate, l.EndDate, l.ImageUrl, l.IsActive as 'ListingActive', l.PurchasePrice,
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
                            },
                            IsActive = reader.GetBoolean(reader.GetOrdinal("ListingActive")),
                            PurchasePrice = reader.GetDecimal(reader.GetOrdinal("PurchasePrice"))
                        };
                    }
                    reader.Close();
                    return listing;
                }
            }
        }

        public void Update(Listing listing)
        {
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                            UPDATE Listing
                            SET Title = @Title,
                                Condition = @Condition, 
                                Location = @Location,
                                Description = @Description,
                                Price = @Price,
                                CategoryId = @CategoryId,
                                ImageUrl = @ImageUrl,
                                IsActive = @IsActive,
                                PurchasePrice = @PurchasePrice
                            WHERE Id = @Id";

                        DbUtils.AddParameter(cmd, "@Id", listing.Id);
                        DbUtils.AddParameter(cmd, "@Title", listing.Title);
                        DbUtils.AddParameter(cmd, "@Condition", listing.Condition);
                        DbUtils.AddParameter(cmd, "@Location", listing.Location);
                        DbUtils.AddParameter(cmd, "@Description", listing.Description);
                        DbUtils.AddParameter(cmd, "@Price", listing.Price);
                        DbUtils.AddParameter(cmd, "@CategoryId", listing.CategoryId);
                        DbUtils.AddParameter(cmd, "@ImageUrl", listing.ImageUrl);
                        DbUtils.AddParameter(cmd, "@IsActive", listing.IsActive);
                        DbUtils.AddParameter(cmd, "@PurchasePrice", listing.Price);

                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }
        public List<Listing> GetListingsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT l.Id as ListingId, l.Title, l.Condition, l.Location, l.Description, l.Price, l.CategoryId, l.PublishDate, l.EndDate, l.ImageUrl, l.IsActive AS 'ListingActive', l.PurchasePrice,
		                                       up.Id as UserProfileId, up.FirstName, up.LastName, up.Email, up.IsAdmin, up.IsActive,
		                                       c.Id, c.Name 
                                        FROM Listing l
                                        JOIN UserProfile up ON up.Id = l.UserProfileId
                                        JOIN Category c ON c.Id = l.CategoryId
                                        WHERE l.UserProfileId = @id
                                        ORDER BY l.PublishDate DESC";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    // sets null to check in controller if no listing is found
                    List<Listing> listings = new List<Listing>();

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
                            },
                            IsActive = reader.GetBoolean(reader.GetOrdinal("ListingActive")),
                            PurchasePrice = reader.GetDecimal(reader.GetOrdinal("PurchasePrice"))
                        };
                        listings.Add(listing);
                    }
                    reader.Close();
                    return listings;
                }
            }
        }
        public List<Listing> GetHomePageListings()
        {
            using (var conn = Connection)
            {
                conn.Open();
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                                        SELECT TOP 5 l.Id as ListingId, l.Title, l.Condition, l.Location, l.Description, l.Price, l.CategoryId, l.PublishDate, l.EndDate, l.ImageUrl, l.IsActive AS 'ListingActive', l.PurchasePrice,
		                                        up.Id as UserProfileId, up.FirstName, up.LastName, up.Email, up.IsAdmin, up.IsActive,
		                                        c.Id, c.Name 
                                        FROM Listing l
                                        JOIN UserProfile up ON up.Id = l.UserProfileId
                                        JOIN Category c ON c.Id = l.CategoryId
                                        WHERE l.IsActive = 'True'
                                        ORDER BY l.PublishDate DESC";

                        using (var reader = cmd.ExecuteReader())
                        {
                            List<Listing> listings = new List<Listing>();
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
                                    },
                                    IsActive = reader.GetBoolean(reader.GetOrdinal("ListingActive")),
                                    PurchasePrice = reader.GetDecimal(reader.GetOrdinal("PurchasePrice"))
                                };
                                listings.Add(listing);
                            }
                            return listings;
                        }
                    }
                }
            }
        }
        public List<Listing> Search(string criterion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        var sql = @"
                                SELECT l.Id as ListingId, l.Title, l.Condition, l.Location, l.Description, l.Price, l.CategoryId, l.PublishDate, l.EndDate, l.ImageUrl, l.IsActive AS 'ListingActive', l.PurchasePrice,
		                                       up.Id as UserProfileId, up.FirstName, up.LastName, up.Email, up.IsAdmin, up.IsActive,
		                                       c.Id, c.Name 
                                        FROM Listing l
                                        JOIN UserProfile up ON up.Id = l.UserProfileId
                                        JOIN Category c ON c.Id = l.CategoryId
                                        WHERE (l.Title LIKE @criterion OR l.Description LIKE @criterion) AND l.IsActive = 'True' 
                                        ORDER BY l.PublishDate DESC";
                        cmd.CommandText = sql;
                        DbUtils.AddParameter(cmd, "@criterion", $"%{criterion}%");
                        using (var reader = cmd.ExecuteReader())
                        {
                            List<Listing> listings = new List<Listing>();

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
                                    },
                                    IsActive = reader.GetBoolean(reader.GetOrdinal("ListingActive")),
                                    PurchasePrice = reader.GetDecimal(reader.GetOrdinal("PurchasePrice"))
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
