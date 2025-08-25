
import React from 'react';
import { TripDay as TripDayType } from '../data/tripData';

interface TripDayProps {
  day: TripDayType;
  isActive: boolean;
}

const TripDay: React.FC<TripDayProps> = ({ day, isActive }) => {
  return (
    <div 
      className={`bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-8 max-w-lg mx-auto 
                  transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    >
      <div className="border-l-4 border-sicily-terracotta pl-4 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-sicily-deep-blue">Day {day.id}</h2>
        <p className="text-lg text-gray-600 font-medium">{day.date}</p>
      </div>

      {/* Location with travel distance info */}
      <h3 className="text-xl md:text-2xl font-semibold text-sicily-terracotta mb-2">
        {day.location}
      </h3>
      
      {day.travelDistance && (
        <div className="mb-4 flex items-center text-gray-700">
          <span className="material-icons-outlined text-sicily-blue mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <span className="text-sm md:text-base">
            {day.travelDistance} from {day.travelFrom}
          </span>
        </div>
      )}

      {/* Accommodation with check-in/check-out times */}
      <div className="mb-4">
        <h4 className="text-md font-semibold text-gray-700 flex items-center">
          <span className="material-icons-outlined text-sicily-blue mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
              <path d="M12 13V7" />
              <path d="M3 13h18" />
              <path d="M19 13v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5" />
            </svg>
          </span>
          {day.accommodation.name}
        </h4>
        <div className="text-sm text-gray-600 ml-6">
          {day.accommodation.checkIn && <p>Check-in: {day.accommodation.checkIn}</p>}
          {day.accommodation.checkOut && <p>Check-out: {day.accommodation.checkOut}</p>}
        </div>
      </div>

      {/* Activities section */}
      <div>
        <h4 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
          <span className="material-icons-outlined text-sicily-blue mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v9" />
              <path d="m16 8-4-3-4 3" />
              <path d="M20 22h-2" />
              <path d="M4 22h2" />
              <path d="M18 11v11" />
              <path d="M6 11v11" />
            </svg>
          </span>
          Today's Activities
        </h4>
        <ul className="space-y-2 ml-2">
          {day.activities.map((activity, idx) => (
            <li key={idx} className="flex items-start text-gray-600">
              <span className="inline-block w-1 h-1 rounded-full bg-sicily-coral mt-2 mr-2"></span>
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TripDay;
