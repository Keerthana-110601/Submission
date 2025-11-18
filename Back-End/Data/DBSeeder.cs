using BankCustomerAPI.Models;
using BankingCustomerAPI.Data;

namespace BankingCustomerAPI
{
    public static class DbSeeder
    {
        public static void Seed(BankingDbContext context)
        {
            context.Database.EnsureCreated();

            // Seed Roles first
            if (!context.Role.Any())
            {
                context.Role.Add(new Role { RoleName = "Admin" });
                context.Role.Add(new Role { RoleName = "Customer" });
                context.SaveChanges();
            }
            


            // Only seed if User table is empty
            if (!context.User.Any())
            {
                // Get default role (Customer) for users
                var defaultRole = context.Role.First(r => r.RoleName == "Customer");
                if (defaultRole == null)
                {
                    defaultRole = new Role { RoleName = "Customer" };
                    context.Role.Add(defaultRole);
                    context.SaveChanges();
                }
                for (int i = 1; i <= 150; i++)
                {
                    context.User.Add(new User
                    {
                        UserName = $"User{i}",
                        Email = $"user{i}@example.com",
                        Password = "Password123", // placeholder password
                        RoleId = defaultRole.RoleId // assign valid foreign key
                    });
                }

                context.SaveChanges();
            }
        }
    }
}
