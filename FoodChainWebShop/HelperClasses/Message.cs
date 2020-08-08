using MimeKit;
using System.Collections.Generic;

namespace FoodChainWebShop.EmailService
{
    public class Message
    {
        public List<MailboxAddress> From { get; set; }

        public string Subject { get; set; }
        public string Content { get; set; }

        public Message(string from, string subject, string content)
        {
            From = new List<MailboxAddress>();

            From.Add(new MailboxAddress (from));

            Subject = subject;
            Content = content;
        }
    }
}
