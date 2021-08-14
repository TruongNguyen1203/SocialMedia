using System.Threading.Tasks;
using Infrastructure.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interface
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);

    }
}