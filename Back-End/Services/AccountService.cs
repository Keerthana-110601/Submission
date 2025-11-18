using BankCustomerAPI.Models;
using BankCustomerAPI.Models.DTOs;
using BankCustomerAPI.Services;
using BankingCustomerAPI.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BankingCustomerAPI.Services
{
    public class AccountService:IAccountService
    {
        private readonly BankingDbContext _context;

        public AccountService(BankingDbContext context)
        {
            _context = context;
        }

        // Create Account
        public async Task<User> CreateAccountAsync(User newUser)
        {
            _context.User.Add(newUser);
            await _context.SaveChangesAsync();
            return newUser;
        }

        // Get Account by ID
        public async Task<User?> GetAccountByIdAsync(int id)
        {
            return await _context.User.FindAsync(id);
        }
        public async Task<List<AccountDTO>> GetAccountsByUserIdAsync(int userId)
        {
            var accounts = await _context.Account
                .Include(a => a.Branch)
                    .ThenInclude(b => b.Banks)  // include the bank through branch
                .Where(a => a.UserId == userId)
                .ToListAsync();

            var result = accounts.Select(a => new AccountDTO
            {
                AccountId = a.AccountId,
                Balance = a.Balance,
                BankName = a.Branch?.Banks?.BankName ?? "Unknown", // safe null
                AccountNumber = a.AccountNumber
            }).ToList();

            return result;
        }


        // Get All Accounts
        public async Task<List<User>> GetAllAccountsAsync()
        {
            return await _context.User.ToListAsync();
        }

        // Update Account
        public async Task<User?> UpdateAccountAsync(int id, User updatedUser)
        {
            var existing = await _context.User.FindAsync(id);
            if (existing == null) return null;

            existing.UserName = updatedUser.UserName;
            existing.Address = updatedUser.Address;
            existing.IsActive = updatedUser.IsActive;
            existing.DateOfBirth = updatedUser.DateOfBirth;
            // Add more fields as needed

            await _context.SaveChangesAsync();
            return existing;
        }

        // Delete Account
        public async Task<bool> DeleteAccountAsync(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null) return false;

            _context.User.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
