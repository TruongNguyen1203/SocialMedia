using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }
        
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest();
        }
        
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is server error");
        }
        
        [HttpGet("unauthorised")]
        public ActionResult GetUnAuthorise()
        {
            return Unauthorized();
        }
        
        
    }
}