using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = _context.Activities.Include(x => x.Attendees)
                    .ThenInclude(x => x.AppUser)
                    .SingleOrDefault(x => x.Id == request.Id);

                var currentUser = _context.Users.SingleOrDefault(x => x.UserName == _userAccessor.GetUserName());
                
                var hostUserName = activity.Attendees.SingleOrDefault(x => x.IsHost)?.AppUser.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == currentUser.UserName);

                if (attendance != null && hostUserName == currentUser.UserName)
                {
                    activity.IsCancel = !activity.IsCancel;
                }
                if(attendance != null && hostUserName != currentUser.UserName)
                {
                    activity.Attendees.Remove(attendance);
                }
                if (attendance == null)
                {
                    attendance = new ActivityAttendee()
                    {
                        Activity = activity,
                        AppUser = currentUser,
                        IsHost = false
                    };
                    
                    activity.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Error when updating attendende");
            }
        }
    }
}