
import React from 'react';
import { tripData } from '../data/tripData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, Home, ListOrdered } from 'lucide-react';

const TripOverview: React.FC = () => {
  // Calculate total travel distance
  const totalDistance = tripData.reduce((total, day) => {
    if (day.travelDistance) {
      // Extract the numeric part from strings like "75 km"
      const match = day.travelDistance.match(/(\d+)/);
      if (match && match[1]) {
        return total + parseInt(match[1], 10);
      }
    }
    return total;
  }, 0);

  // Count unique locations
  const uniqueLocations = new Set(tripData.map(day => day.location)).size;

  // Count unique accommodations
  const uniqueAccommodations = new Set(tripData.map(day => day.accommodation.name)).size;

  const statItems = [
    {
      title: "Total Days",
      value: tripData.length,
      icon: Calendar,
      color: "text-blue-500"
    },
    {
      title: "Locations",
      value: uniqueLocations,
      icon: MapPin,
      color: "text-red-500"
    },
    {
      title: "Accommodations",
      value: uniqueAccommodations,
      icon: Home,
      color: "text-green-500"
    },
    {
      title: "Total Distance",
      value: `${totalDistance} km`,
      icon: ListOrdered,
      color: "text-purple-500"
    }
  ];

  return (
    <Card className="border-sicily-terracotta/20">
      <CardHeader>
        <CardTitle className="text-2xl text-sicily-deep-blue">Trip Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {statItems.map((item, index) => (
            <div key={index} className="flex items-center p-3 border rounded-md border-gray-200">
              <div className={`p-2 rounded-full ${item.color} bg-gray-100 mr-3`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="font-semibold text-lg">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripOverview;
