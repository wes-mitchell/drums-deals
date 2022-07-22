using Microsoft.Extensions.Configuration;
using DrumDeals.Models;
using System.Collections.Generic;
using DrumDeals.Utils;

namespace DrumDeals.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }
        public List<Category> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"SELECT * FROM Category";

                        using (var reader = cmd.ExecuteReader())
                        {
                            List<Category> categoryList = new List<Category>();
                            while (reader.Read())
                            {
                                Category category = new Category
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "Name")
                                };
                                categoryList.Add(category);
                            }
                            return categoryList;
                        }
                    }
                }
            }
        }
    }
}
