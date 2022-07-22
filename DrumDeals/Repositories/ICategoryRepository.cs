using System.Collections.Generic;
using DrumDeals.Models;

namespace DrumDeals.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
    }
}
