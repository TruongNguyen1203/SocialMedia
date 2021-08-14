using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public List<ActivityAttendee> Activities { get; set; } = new List<ActivityAttendee>();
        public ICollection<Photo> Photos { get; set; }
    }
}