
import React from 'react';
import { tripData } from '../data/tripData';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, ListOrdered, Home } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TripOverviewPage = () => {
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto py-16 px-4">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-sicily-deep-blue">Trip Overview</h1>
          <Link to="/">
            <Button variant="outline" className="border-sicily-terracotta text-sicily-terracotta hover:bg-sicily-terracotta/10">
              Back to Map View
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statItems.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-md flex items-center">
              <div className={`p-3 rounded-full ${item.color} bg-gray-100 mr-3`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="font-semibold text-xl">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View Options */}
        <Tabs defaultValue="itinerary" className="mb-8">
          <TabsList className="border-b mb-8 w-full bg-transparent justify-start">
            <TabsTrigger value="itinerary" className="data-[state=active]:border-sicily-terracotta data-[state=active]:border-b-2 rounded-none">
              Day by Day Itinerary
            </TabsTrigger>
            <TabsTrigger value="accommodations" className="data-[state=active]:border-sicily-terracotta data-[state=active]:border-b-2 rounded-none">
              Accommodations
            </TabsTrigger>
            <TabsTrigger value="activities" className="data-[state=active]:border-sicily-terracotta data-[state=active]:border-b-2 rounded-none">
              Activities
            </TabsTrigger>
          </TabsList>

          {/* Itinerary Tab */}
          <TabsContent value="itinerary">
            <Card>
              <CardHeader>
                <CardTitle>Complete Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Travel</TableHead>
                      <TableHead>Accommodation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tripData.map((day) => (
                      <TableRow key={day.id}>
                        <TableCell className="font-medium">Day {day.id}</TableCell>
                        <TableCell>{day.date}</TableCell>
                        <TableCell>{day.location}</TableCell>
                        <TableCell>
                          {day.travelDistance ? (
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-sicily-terracotta" />
                              {day.travelDistance} from {day.travelFrom}
                            </span>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell>{day.accommodation.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accommodations Tab */}
          <TabsContent value="accommodations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from(new Set(tripData.map(day => day.accommodation.name))).map((accommodationName, index) => {
                const stays = tripData.filter(day => day.accommodation.name === accommodationName);
                const firstStay = stays[0];
                const lastStay = stays[stays.length - 1];
                
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Home className="h-5 w-5 mr-2 text-sicily-terracotta" />
                        {accommodationName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p><span className="font-medium">Location:</span> {firstStay.location}</p>
                        <p><span className="font-medium">Check-in:</span> {firstStay.accommodation.checkIn || "—"}</p>
                        <p><span className="font-medium">Check-out:</span> {lastStay.accommodation.checkOut || "—"}</p>
                        <p><span className="font-medium">Length of stay:</span> {stays.length} {stays.length === 1 ? 'day' : 'days'}</p>
                        <p><span className="font-medium">Dates:</span> {firstStay.date} {stays.length > 1 ? `- ${lastStay.date}` : ''}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>All Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {tripData.map((day) => (
                    <div key={day.id} className="border-l-4 border-sicily-terracotta pl-4">
                      <h3 className="text-xl font-semibold mb-2">Day {day.id} - {day.location}</h3>
                      <p className="text-sm text-gray-500 mb-3">{day.date}</p>
                      <ul className="space-y-2">
                        {day.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start text-gray-700">
                            <span className="inline-block w-2 h-2 rounded-full bg-sicily-coral mt-2 mr-2"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TripOverviewPage;
