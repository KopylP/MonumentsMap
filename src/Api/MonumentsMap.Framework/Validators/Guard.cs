using System;

namespace MonumentsMap.Framework.Validators
{
    public static class Guard
    {
        public static void NotNullOrEmpty(string str)
        {
            if (string.IsNullOrEmpty(str))
            {
                throw new ArgumentException($"String value should not be empty or null");
            }
        }

        public static void NotNull(object value)
        {
            if (value == null)
            {
                throw new ArgumentException($"Value should not be null");
            }
        }

        public static void ArrayIsNotEmpty(Array array)
        {
            if (array == null || array.Length == 0)
            {
                throw new ArgumentException($"Array should not be empty");
            }
        }
    }
}
