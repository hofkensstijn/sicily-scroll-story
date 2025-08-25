import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { TripDay, tripData } from '../data/tripData';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface MapProps {
  activeDay: TripDay | null;
  mapboxToken: string;
}

const MapComponent: React.FC<MapProps> = ({ activeDay, mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const [distance, setDistance] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapInitialized) return;
    
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [14.2, 37.6], // Center of Sicily
      zoom: 7,
      pitch: 30,
      bearing: 0,
    });

    map.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'bottom-right');
    // map.current.scrollZoom.disable(); // Commented out to avoid interference with interactions

    map.current.on('load', () => setMapInitialized(true));
    
    // Remove the map click handler that might be interfering
    // map.current.on('click', (e) => {
    //   console.log('Map clicked at:', e.lngLat);
    // });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    };
  }, [mapboxToken]);

  // Handle route fetching and drawing
  useEffect(() => {
    if (!mapInitialized || !map.current || !activeDay) return;

    const removeRoute = () => {
      if (map.current?.getSource('route')) {
        map.current.removeLayer('route');
        map.current.removeSource('route');
      }
      setDistance(null);
    };

    if (!showRoute || !activeDay.travelFrom) {
      removeRoute();
      return;
    }

    const previousDay = tripData.find(day => day.location === activeDay.travelFrom && day.id < activeDay.id);
    if (!previousDay) return;

    const startCoords = previousDay.coordinates;
    const endCoords = activeDay.coordinates;

    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords.join(',')};${endCoords.join(',')}?geometries=geojson&access_token=${mapboxToken}`
        );
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry;
          const dist = (data.routes[0].distance / 1000).toFixed(2);
          setDistance(`${dist} km`);

          if (map.current?.getSource('route')) {
            (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData(route);
          } else {
            map.current?.addSource('route', { type: 'geojson', data: route });
            map.current?.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: { 'line-join': 'round', 'line-cap': 'round' },
              paint: { 'line-color': '#3887be', 'line-width': 5, 'line-opacity': 0.75 },
            });
          }
        } else {
          removeRoute();
        }
      } catch (error) {
        console.error("Error fetching route:", error);
        removeRoute();
      }
    };

    fetchRoute();

  }, [activeDay, mapInitialized, showRoute, mapboxToken]);

  // Update map view and markers
  useEffect(() => {
    if (!mapInitialized || !map.current || !activeDay) return;
    
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    const marker = new mapboxgl.Marker({ color: "#D27D2D" })
      .setLngLat(activeDay.coordinates)
      .addTo(map.current);
    
    markersRef.current.push(marker);
    
    map.current.flyTo({
      center: activeDay.coordinates,
      zoom: activeDay.zoomLevel,
      essential: true,
      duration: 2000,
      bearing: Math.random() * 60 - 30,
    });
    
  }, [activeDay, mapInitialized]);
  
  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Completely isolated Switch component */}
      <div 
        className="absolute bottom-12 left-4 z-[9999]"
        style={{ 
          pointerEvents: 'auto',
          isolation: 'isolate'
        }}
      >
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div 
              className="cursor-pointer select-none"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
                const newValue = !showRoute;
                console.log('Switch clicked, new value:', newValue);
                setShowRoute(newValue);
              }}
            >
              <Switch 
                id="route-toggle" 
                checked={showRoute} 
                onCheckedChange={(checked) => {
                  console.log('Switch onCheckedChange, new value:', checked);
                  setShowRoute(checked);
                }} 
              />
            </div>
            <Label 
              htmlFor="route-toggle" 
              className="cursor-pointer select-none text-sm font-medium text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
                const newValue = !showRoute;
                console.log('Label clicked, new value:', newValue);
                setShowRoute(newValue);
              }}
            >
              Show Route
            </Label>
          </div>
          {distance && (
            <div className="text-xs text-center mt-2 text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {distance}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;