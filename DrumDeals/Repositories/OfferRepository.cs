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
            using (var conn = Connection)
            {
                conn.Open();
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                                        INSERT INTO Offer (UserProfileId, ListingId, OfferAmount, Accepted)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserProfileId, @ListingId, @OfferAmount, @Accepted)";
                        DbUtils.AddParameter(cmd, "@UserProfileId", offer.UserProfileId);
                        DbUtils.AddParameter(cmd, "@ListingId", offer.ListingId);
                        DbUtils.AddParameter(cmd, "@OfferAmount", offer.OfferAmount);
                        DbUtils.AddParameter(cmd, "@Accepted", offer.Accepted);

                        offer.Id = (int)cmd.ExecuteScalar();
                    }
                }
            }
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
            using (var conn = Connection)
            {
                conn.Open();
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                                        SELECT o.Id, o.UserProfileId, o.ListingId, o.OfferAmount, o.Accepted, 
                                               l.Id as ListingId, l.Title, l.Condition, l.Location, l.Description, l.Price, l.CategoryId, l.PublishDate, l.EndDate, l.ImageUrl, l.IsActive as 'ListingActive', l.PurchasePrice, l.UserProfileId AS 'ListingUserProfileId',
                           up.Id, up.FirstName, up.LastName, up.Email, up.IsActive, up.isAdmin
                                        FROM Offer o
                                        JOIN UserProfile up ON up.Id = o.UserProfileId
                                        JOIN Listing l ON l.Id = o.ListingId
                                        WHERE o.Id = @id";

                        DbUtils.AddParameter(cmd, "@id", id);
                        var reader = cmd.ExecuteReader();
                            
                        Offer offer = null;

                        if (reader.Read())
                        {
                            offer = new Offer
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                ListingId = DbUtils.GetInt(reader, "ListingId"),
                                UserProfile = new UserProfile
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                    IsAdmin = reader.GetBoolean(reader.GetOrdinal("IsAdmin"))
                                },
                                Listing = new Listing
                                {
                                    Id = DbUtils.GetInt(reader, "ListingId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Condition = DbUtils.GetString(reader, "Condition"),
                                    UserProfileId = DbUtils.GetInt(reader, "ListingUserProfileId"),
                                    Location = DbUtils.GetString(reader, "Location"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                                    CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                    PublishDate = DbUtils.GetDateTime(reader, "PublishDate"),
                                    EndDate = DbUtils.GetNullableDateTime(reader, "EndDate"),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                },
                                OfferAmount = reader.GetDecimal(reader.GetOrdinal("OfferAmount")),
                                Accepted = reader.GetBoolean(reader.GetOrdinal("Accepted"))
                            };
                        }
                        reader.Close();
                        return offer;
                    }
                }
            }
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
