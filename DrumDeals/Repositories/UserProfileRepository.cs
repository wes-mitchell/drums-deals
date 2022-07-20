using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using DrumDeals.Models;
using DrumDeals.Utils;
using System.Data;
using Microsoft.Data.SqlClient;

namespace DrumDeals.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAllUsers()
        {
            List<UserProfile> users = new List<UserProfile>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM UserProfile";

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        UserProfile user = new UserProfile
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("IsAdmin"))
                        };

                        users.Add(user);
                    }
                    reader.Close();

                    return users;

                }
            }
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM UserProfile WHERE FirebaseUserId = @id";
                    DbUtils.AddParameter(cmd, "@id", firebaseUserId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        UserProfile userProfile = null;

                        if (reader.Read())
                        {
                            userProfile = new UserProfile
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                IsAdmin = reader.GetBoolean(reader.GetOrdinal("IsAdmin"))
                            };
                        }
                        return userProfile;
                    }
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, Email, IsActive, IsAdmin)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @Email, @IsActive, @IsAdmin)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@IsActive", userProfile.IsActive);
                    DbUtils.AddParameter(cmd, "@IsAdmin", userProfile.IsAdmin);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public UserProfile GetByUserId(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT *
                                    FROM UserProfile
                                    WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        UserProfile userProfile = null;

                        if (reader.Read())
                        {
                            userProfile = new UserProfile
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                IsAdmin = reader.GetBoolean(reader.GetOrdinal("IsAdmin"))
                            };
                        }
                        return userProfile;
                    }
                }
            }
        }

        //public void Add(UserProfile userProfile)
        //{
        //    _context.Add(userProfile);
        //    _context.SaveChanges();
        //}
        //*/
    }
}
