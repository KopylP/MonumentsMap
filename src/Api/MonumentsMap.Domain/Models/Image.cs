using MonumentsMap.Framework.Validators;

namespace MonumentsMap.Domain.Models
{
    public class Image
    {
        private Image() { }

        public Image(string imagePath, string imageName, byte[] fileBytes) 
        {
            Guard.NotNullOrEmpty(imagePath);
            Guard.NotNullOrEmpty(imageName);
            Guard.ArrayIsNotEmpty(fileBytes);

            ImagePath = imagePath;
            ImageName = imageName;
            ImageBytes = fileBytes;
        }
        public string ImagePath { get; private set; }
        public string ImageName { get; private set; }
        public byte[] ImageBytes { get; private set; }
    }
}