using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
        
    }
    
    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }
        
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var activityId = Guid.Parse(_httpContextAccessor.HttpContext?.GetRouteValue("id").ToString() ?? string.Empty);

            var attendance =
                _dbContext.ActivityAttendees
                    .AsNoTracking()
                    .SingleOrDefault(x => x.AppUserId == userId && x.ActivityId == activityId);

            if (attendance == null)
            {
                return Task.CompletedTask;
            }

            if (attendance.IsHost)
            {
                context.Succeed(requirement);
            }
                
            return Task.CompletedTask;
        }
    }
}