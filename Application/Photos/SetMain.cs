using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
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
                var user = _context.Users.Include(x => x.Photos)
                    .FirstOrDefault(x => x.UserName == _userAccessor.GetUserName());
                
                if (user == null) return null;

                var currentMainPhoto = user.Photos.FirstOrDefault(x => x.IsMain);
                
                if (currentMainPhoto != null) currentMainPhoto.IsMain = false;

                var updatePhoto = user.Photos.FirstOrDefault(x => x.Id == request.Id);
                
                if (updatePhoto != null) updatePhoto.IsMain = true;

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Error when set main image");
            }
        }
    }
}