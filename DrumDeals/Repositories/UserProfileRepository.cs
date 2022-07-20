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
            //using (var conn = Connection)
            //{
            //    conn.Open();
            //    using (var cmd = conn.CreateCommand())
            //    {
            //        cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, DisplayName, 
            //                                                     Email, CreateDateTime, ImageLocation, UserTypeId)
            //                            OUTPUT INSERTED.ID
            //                            VALUES (@FirebaseUserId, @FirstName, @LastName, @DisplayName, 
            //                                    @Email, @CreateDateTime, @ImageLocation, @UserTypeId)";
            //        DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
            //        DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
            //        DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
            //        DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
            //        DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
            //        DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
            //        DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
            //        DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

            //        userProfile.Id = (int)cmd.ExecuteScalar();
            //    }
            //}
        }

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

        public UserProfile GetByUserId(int id)
        {
            UserProfile userProfile = null;
            return userProfile;
            //using (var conn = Connection)
            //{
            //    conn.Open();
            //    using (var cmd = conn.CreateCommand())
            //    {
            //        cmd.CommandText = @"
            //            SELECT   up.FirstName, up.LastName, up.DisplayName, 
            //                   up.Email, up.CreateDateTime, up.ImageLocation,
            //                   ut.Name 
            //              FROM UserProfile up
            //                   LEFT JOIN UserType ut on up.UserTypeId = ut.Id
            //             WHERE up.Id = @Id";

            //        DbUtils.AddParameter(cmd, "@Id", id);

            //        UserProfile userProfile = null;

            //        var reader = cmd.ExecuteReader();
            //        if (reader.Read())
            //        {
            //            userProfile = new UserProfile()
            //            {
            //                Id = id,
            //                FirstName = DbUtils.GetString(reader, "FirstName"),
            //                LastName = DbUtils.GetString(reader, "LastName"),
            //                DisplayName = DbUtils.GetString(reader, "DisplayName"),
            //                Email = DbUtils.GetString(reader, "Email"),
            //                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
            //                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
            //                UserType = new UserType()
            //                {
            //                    Name = DbUtils.GetString(reader, "Name")
            //                }
            //            };
            //        }
            //        reader.Close();

            //        return userProfile;
            //    }
            //}
        }

        //public void Add(UserProfile userProfile)
        //{
        //    _context.Add(userProfile);
        //    _context.SaveChanges();
        //}
        //*/
    }
}
