using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interface;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var hostUser = _context.Users.SingleOrDefault(x => x.UserName == _userAccessor.GetUserName());

                var attendee = new ActivityAttendee()
                {
                    AppUser = hostUser,
                    Activity = request.Activity,
                    IsHost = true
                };
                request.Activity.Attendees.Add(attendee);
                
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}