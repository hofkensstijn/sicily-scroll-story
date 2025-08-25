
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { restaurantData, Restaurant } from '../data/restaurantData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Star, Phone, Globe, Clock } from 'lucide-react';

const RestaurantsPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  
  // Get unique locations for filtering
  const locations = ['All', ...new Set(restaurantData.map(restaurant => restaurant.location))];
  
  // Filter restaurants based on selected location
  const filteredRestaurants = selectedLocation === 'All' 
    ? restaurantData 
    : restaurantData.filter(restaurant => restaurant.location === selectedLocation);

  const getPriceRangeText = (priceRange: string) => {
    switch (priceRange) {
      case '€': return 'Budget-friendly';
      case '€€': return 'Moderate';
      case '€€€': return 'Upscale';
      case '€€€€': return 'Fine dining';
      default: return 'Price varies';
    }
  };

  const getStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Journey
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-sicily-deep-blue">
                Restaurants to Visit in Sicily
              </h1>
            </div>
            <Link to="/overview">
              <Button variant="outline" className="text-sicily-terracotta border-sicily-terracotta hover:bg-sicily-terracotta/10">
                View Trip Overview
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Filter by Location</h2>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <Button
                key={location}
                variant={selectedLocation === location ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLocation(location)}
                className={selectedLocation === location ? "bg-sicily-terracotta hover:bg-sicily-deep-blue" : ""}
              >
                {location}
              </Button>
            ))}
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">{restaurant.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {restaurant.location}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">{getStarRating(restaurant.rating)}</div>
                      <span className="text-sm text-gray-600">({restaurant.rating})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-1">
                      {restaurant.priceRange}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      {getPriceRangeText(restaurant.priceRange)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="outline" className="text-xs">
                    {restaurant.cuisine}
                  </Badge>
                </div>
                
                <CardDescription className="text-sm leading-relaxed">
                  {restaurant.description}
                </CardDescription>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Must-try dishes:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {restaurant.recommendedDishes.map((dish, index) => (
                      <li key={index}>• {dish}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-3 border-t space-y-2 text-xs text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-2" />
                    {restaurant.address}
                  </div>
                  
                  {restaurant.phone && (
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-2" />
                      {restaurant.phone}
                    </div>
                  )}
                  
                  {restaurant.openingHours && (
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-2" />
                      {restaurant.openingHours}
                    </div>
                  )}
                  
                  {restaurant.website && (
                    <div className="flex items-center">
                      <Globe className="w-3 h-3 mr-2" />
                      <a 
                        href={restaurant.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sicily-terracotta hover:underline"
                      >
                        Visit website
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No restaurants found for the selected location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantsPage;
