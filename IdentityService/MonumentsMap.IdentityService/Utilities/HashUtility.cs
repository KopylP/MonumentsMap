using System.Security.Cryptography;
using System.Text;

namespace MonumentsMap.IdentityService.Utilities
{
    public class HashUtility
    {
        public static string ComputeSha256Hash(string rowData)
        {
            using (HashAlgorithm sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rowData));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}