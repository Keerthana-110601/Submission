using System;

namespace BankCustomerAPI.Models.DTOs
{
    public class RegisterRequest
    {
        public string UserName { get; set; } = string.Empty;      // required
        public string Email { get; set; } = string.Empty;         // prepopulated / required
        public string? Password { get; set; }                     // required
        public int RoleId { get; set; }                           // required
        public DateTime? DateOfBirth { get; set; }
        public string? Address { get; set; }                      // required
        public bool? IsMinor { get; set; } = false;
        public bool? IsNRI { get; set; } = false;
        public string? PAN { get; set; }                          // required
        public string? Aadhar { get; set; }                       // required
        public bool? POA_Exists { get; set; } = false;
        public string? POA_Details { get; set; }
    }
}
