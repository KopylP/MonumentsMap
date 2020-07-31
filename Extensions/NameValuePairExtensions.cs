using System;
using System.Collections.Generic;
using System.Collections.Specialized;

public static class NameValuePairExtensions
{
    /// <summary>
    ///     A NameValueCollection extension method that converts the @this to a dictionary.
    /// </summary>
    /// <param name="this">The @this to act on.</param>
    /// <returns>@this as an IDictionary&lt;string,string&gt;</returns>
    public static IDictionary<string, string> ToDictionary(this NameValueCollection @this)
    {
        var dict = new Dictionary<string, string>();

        if (@this != null)
        {
            foreach (string key in @this.AllKeys)
            {
                try
                {
                    dict.Add(key, @this[key]);
                }
                catch (ArgumentNullException)
                {
                    continue;
                }
            }
        }

        return dict;
    }
}