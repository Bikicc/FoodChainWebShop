using MailKit.Net.Smtp;
using MimeKit;
using System.Threading.Tasks;

namespace FoodChainWebShop.EmailService {
    public class EmailSenderService : IEmailSender {
        private readonly EmailConfiguration _emailConfig;

        public EmailSenderService (EmailConfiguration emailConfig) {
            _emailConfig = emailConfig;
        }

        public async Task SendEmailAsync (Message message) {
            var emailMessage = CreateEmailMessage (message);

            await SendAsync(emailMessage);
        }
        private MimeMessage CreateEmailMessage (Message message) {
            var emailMessage = new MimeMessage ();
            emailMessage.From.AddRange (message.From);
            emailMessage.To.Add (new MailboxAddress ("FastFoodChain Customer Service", _emailConfig.UserName));
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart (MimeKit.Text.TextFormat.Text) { Text = message.Content };
            emailMessage.ReplyTo.AddRange(message.From);
            return emailMessage;
        }

        private async Task SendAsync (MimeMessage mailMessage) {
            using (var client = new SmtpClient ()) {
                try {
                    await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove ("XOAUTH2");
                    await client.AuthenticateAsync(_emailConfig.UserName, _emailConfig.Password);

                    await client.SendAsync(mailMessage);
                } catch {
                    throw;
                } finally {
                    await client.DisconnectAsync(true);
                    client.Dispose();
                }
            }
        }
    }
}