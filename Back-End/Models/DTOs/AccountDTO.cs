namespace BankCustomerAPI.Models.DTOs
{
    public class AccountDTO
    {
        public int AccountId { get; set; }
        public string AccountNumber { get; set; }
        public decimal Balance { get; set; }
        public string Currency { get; set; }
        public string BankName { get; set; }
    }
}
