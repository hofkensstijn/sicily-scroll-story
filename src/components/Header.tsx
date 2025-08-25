
import React from 'react';
import { tripData } from '../data/tripData';

const Header: React.FC = () => {
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

  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl md:text-3xl font-bold">Sicily Journey</h1>
        <div className="text-white/90">
          <p className="hidden md:block">Summer 2025 • {totalDistance} km total</p>
          <p className="md:hidden text-sm">Summer 2025</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
