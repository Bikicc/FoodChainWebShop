using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json;
namespace FoodChainWebShop.Models {
    public class User {
        public int UserId { get; set; }

        [Required]
        [StringLength (15, ErrorMessage = "{0} must be between {2} and {1}", MinimumLength = 4)]
        public string Username { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        [JsonIgnore] //Mozda triba izbacit
        public ICollection<Order> Orders { get; set; }

        [JsonIgnore] //Mozda triba izbacit
        public ICollection<Favourite> Favourites { get; set; }

        [Required]
        [StringLength (15, ErrorMessage = "Password must be between {2} and {1}", MinimumLength = 4)]
        [NotMapped]
        public string PasswordPlain {
            set { Password = Encrypt (value); }
            // get { return Decrypt (Password); }
        }

        [NotMapped]
        public string Token { get; set; }

        private string Encrypt (string clearText) {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes (clearText);
            using (Aes encryptor = Aes.Create ()) {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes (EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes (32);
                encryptor.IV = pdb.GetBytes (16);
                using (MemoryStream ms = new MemoryStream ()) {
                    using (CryptoStream cs = new CryptoStream (ms, encryptor.CreateEncryptor (), CryptoStreamMode.Write)) {
                        cs.Write (clearBytes, 0, clearBytes.Length);
                        cs.Close ();
                    }
                    clearText = Convert.ToBase64String (ms.ToArray ());
                }
            }
            return clearText;
        }

        private string Decrypt (string cipherText) {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] cipherBytes = Convert.FromBase64String (cipherText);
            using (Aes encryptor = Aes.Create ()) {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes (EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes (32);
                encryptor.IV = pdb.GetBytes (16);
                using (MemoryStream ms = new MemoryStream ()) {
                    using (CryptoStream cs = new CryptoStream (ms, encryptor.CreateDecryptor (), CryptoStreamMode.Write)) {
                        cs.Write (cipherBytes, 0, cipherBytes.Length);
                        cs.Close ();
                    }
                    cipherText = Encoding.Unicode.GetString (ms.ToArray ());
                }
            }
            return cipherText;
        }

    }
}