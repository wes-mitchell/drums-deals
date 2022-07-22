using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DrumDeals.Repositories;
using System.Collections.Generic;

namespace DrumDeals.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }

    }
}
