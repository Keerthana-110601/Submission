using BankCustomerAPI.Models;
using BankCustomerAPI.Models.DTOs;
using BankingCustomerAPI.Data;
using BankCustomerAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using System.Text.RegularExpressions;

namespace BankCustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly BankingDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(BankingDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // ------------------------- REGISTER -------------------------
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Find the existing user by email
            var existingUser = await _context.User
                .FirstOrDefaultAsync(u => u.Email == model.Email);

            if (existingUser == null)
                return BadRequest(new { message = "Email not pre-registered. Contact Admin." });

            // Update existing user details
            existingUser.UserName = model.UserName;
            existingUser.Password = model.Password != null
                ? BCrypt.Net.BCrypt.HashPassword(model.Password)
                : existingUser.Password; // keep existing password if none provided
            existingUser.Address = model.Address;
            existingUser.PAN = model.PAN;
            existingUser.Aadhar = model.Aadhar;
            existingUser.RoleId = model.RoleId;
            existingUser.DateOfBirth = model.DateOfBirth;
            existingUser.IsMinor = model.IsMinor;
            existingUser.IsNRI = model.IsNRI;
            existingUser.POA_Exists = model.POA_Exists;
            existingUser.POA_Details = model.POA_Details;
            existingUser.IsActive = true;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration details updated successfully" });
        }


        // ------------------------- LOGIN -------------------------
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            string sanitizedPassword = Regex.Replace(request.Password ?? "", @"[^\u0000-\uFFFF]", "");
            var user = await _context.User
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == request.Email);
            try
            {
                if (!BCrypt.Net.BCrypt.Verify(sanitizedPassword, user.Password))
                    return Unauthorized(new { message = "Invalid email or password." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error verifying password: " + ex.Message });
            }

            user.LastLogin = DateTime.UtcNow;

            var token = _jwtService.GenerateJwtToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                token,
                refreshToken,
                expiration = DateTime.UtcNow.AddHours(1),
                user = new
                {
                    user.UserId,
                    user.UserName,
                    user.Email,
                    user.RoleId
                }
            });
        }

        // ------------------------- EMAIL VERIFICATION -------------------------
        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
                return BadRequest(new { message = "Email is required" });

            var userExists = await _context.User.AnyAsync(u => u.Email == email);

            return Ok(new { exists = userExists });
        }
    }
}
