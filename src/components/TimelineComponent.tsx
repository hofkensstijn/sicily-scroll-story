
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { tripData } from '../data/tripData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TimelineComponent: React.FC<{ activeDay: number }> = ({ activeDay }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 w-[90%] max-w-4xl bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader className="p-4">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-sicily-terracotta" />
            Trip Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex justify-between items-center">
            {tripData.map((day) => (
              <div
                key={day.id}
                className={`relative flex flex-col items-center ${activeDay === day.id ? 'scale-110' : ''}`}
              >
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 
                             ${activeDay === day.id ? 'bg-sicily-terracotta text-white' : 
                                                     'bg-gray-200 text-gray-600'} 
                             transition-all duration-300`}
                >
                  {day.id}
                </div>
                <div className="text-xs font-medium">
                  {day.location.split(' ')[0]}
                </div>
                {activeDay === day.id && (
                  <div className="absolute -top-8 whitespace-nowrap text-xs font-semibold bg-sicily-terracotta text-white px-2 py-1 rounded">
                    {day.date}
                  </div>
                )}
                {activeDay === day.id && (
                  <div className="absolute -bottom-1 w-2 h-2 bg-sicily-terracotta rotate-45"></div>
                )}
              </div>
            ))}
          </div>
          <div className="relative h-1 bg-gray-200 mt-2 mb-1 rounded-full">
            <div 
              className="absolute top-0 left-0 h-full bg-sicily-terracotta rounded-full transition-all duration-300" 
              style={{ 
                width: `${(activeDay / tripData.length) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <div>Start: June 1</div>
            <div>End: June 16</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineComponent;
