using System;
using System.Collections.Generic;

namespace MonumentsMap.Infrastructure.Comparers.Monument
{
    public class MonumentDistanceComparer : IComparer<Domain.Models.Monument>
    {
        private readonly double _currentLat, _currentLong;

        public MonumentDistanceComparer(double currentLat, double currentLong)
            => (_currentLat, _currentLong) = (currentLat, currentLong);

        public int Compare(Domain.Models.Monument x, Domain.Models.Monument y)
        {
            var distanceX = Distance(x.Latitude, x.Longitude);
            var distanceY = Distance(y.Latitude, y.Longitude);

            return distanceX.CompareTo(distanceY);
        }

        private double Distance(double toLat, double toLon)
        {
            double radius = 6378137;   // approximate Earth radius, *in meters*
            double deltaLat = toLat - _currentLat;
            double deltaLon = toLon - _currentLong;
            double angle = 2 * Math.Asin(Math.Sqrt(
                    Math.Pow(Math.Sin(deltaLat / 2), 2) +
                            Math.Cos(_currentLat) * Math.Cos(toLat) *
                                    Math.Pow(Math.Sin(deltaLon / 2), 2)));
            return radius * angle;
        }
    }
}
