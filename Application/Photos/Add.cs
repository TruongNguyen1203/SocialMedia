using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            
            public Handler(DataContext context,IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
            } 
            
            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = _context.Users.Include(x => x.Photos).SingleOrDefault(x => x.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo()
                {
                    Id = photoUploadResult.PublishId,
                    Url = photoUploadResult.Url
                };

                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;
                
                user.Photos.Add(photo);
                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Photo>.Success(photo);
                return Result<Photo>.Failure("Error when add photo");
            }
        }
    }
}