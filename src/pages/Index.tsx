import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import MapComponent from '../components/MapComponent';
import TripDay from '../components/TripDay';
import TimelineComponent from '../components/TimelineComponent';
import TripOverview from '../components/TripOverview';
import { tripData, TripDay as TripDayType } from '../data/tripData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [activeDay, setActiveDay] = useState<TripDayType | null>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const navigate = useNavigate();

  // Calculate total travel distance
  const totalDistance = tripData.reduce((total, day) => {
    if (day.travelDistance) {
      const match = day.travelDistance.match(/(\d+)/);
      if (match && match[1]) {
        return total + parseInt(match[1], 10);
      }
    }
    return total;
  }, 0);

  // Set up intersection observer to determine which day is in view
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const dayId = Number(entry.target.getAttribute('data-day-id'));
          const day = tripData.find(d => d.id === dayId);
          if (day) {
            setActiveDay(day);
          }
        }
      });
    }, {
      threshold: 0.6,
      root: containerRef.current
    });
    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });
    return () => {
      sectionsRef.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Set initial day on mount
  useEffect(() => {
    setActiveDay(tripData[0]);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden">
      {/* Map Container (Fixed Position) */}
      <div className="map-container">
        {mapboxToken ? (
          <MapComponent activeDay={activeDay} mapboxToken={mapboxToken} />
        ) : (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Mapbox Token Missing</h2>
              <p className="mb-4 text-sm text-gray-600">
                Please add your Mapbox access token to a <code>.env.local</code> file in the root of the project.
              </p>
              <pre className="bg-gray-100 p-2 rounded">VITE_MAPBOX_TOKEN=your_token_here</pre>
            </div>
          </div>
        )}
      </div>

      <Header />
      
      {activeDay && <TimelineComponent activeDay={activeDay.id} />}
      
      {/* Navigation buttons */}
      <div 
        className="fixed top-20 right-4 z-[9999]"
        style={{ 
          pointerEvents: 'auto',
          isolation: 'isolate'
        }}
      >
        <div className="space-y-2">
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              e.nativeEvent.stopImmediatePropagation();
              console.log('Overview button clicked');
              navigate('/overview');
            }}
            className="cursor-pointer"
          >
            <Button className="bg-white border border-sicily-terracotta text-sicily-terracotta hover:bg-sicily-terracotta/10 w-full">
              View Detailed Overview
            </Button>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              e.nativeEvent.stopImmediatePropagation();
              console.log('Restaurants button clicked');
              navigate('/restaurants');
            }}
            className="cursor-pointer"
          >
            <Button className="bg-white border border-sicily-terracotta text-sicily-terracotta hover:bg-sicily-terracotta/10 w-full">
              Restaurants to Visit
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scrollable content */}
      <div ref={containerRef} className="scroll-container relative z-20">
        {/* Sicily intro section */}
        <section className="scroll-section flex items-center">
          <div className="content-container md:px-12 py-8 ml-auto mr-4 px-0">
            <div className="bg-white/90 backdrop-blur-sm shadow-lg p-6 md:p-8 max-w-lg mx-0 my-0 px-[32px] py-[32px] rounded-lg">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-sicily-deep-blue">
                Sicily Journey
              </h1>
              <p className="text-xl mb-6 text-gray-700">
                Explore our 16-day adventure around the beautiful island of Sicily. 
                Scroll to follow our journey day by day.
              </p>
              <div className="mt-8">
                <TripOverview />
              </div>
            </div>
          </div>
        </section>
        
        {/* Day sections */}
        {tripData.map((day, index) => (
          <section 
            key={day.id} 
            ref={(el: HTMLDivElement | null) => {
              sectionsRef.current[index] = el;
            }} 
            data-day-id={day.id} 
            className="scroll-section flex items-center"
          >
            <div className="content-container px-6 md:px-12 py-8 ml-auto mr-4">
              <TripDay day={day} isActive={activeDay?.id === day.id} />
            </div>
          </section>
        ))}
        
        {/* Final overview section */}
        <section className="scroll-section flex items-center">
          <div className="content-container px-6 md:px-12 py-8 ml-auto mr-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-8 max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sicily-deep-blue">
                Trip Summary
              </h2>
              <p className="text-lg mb-4 text-gray-700">
                16 days, 6 cities, and countless memories across Sicily's most beautiful locations.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-sicily-terracotta mr-2">•</span>
                  <span>Total distance: ~{totalDistance} km</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sicily-terracotta mr-2">•</span>
                  <span>4 different accommodations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sicily-terracotta mr-2">•</span>
                  <span>From ancient ruins to volcanic landscapes</span>
                </li>
              </ul>
              <p className="text-gray-600 italic">
                Planning by Sicily Journey Team
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;