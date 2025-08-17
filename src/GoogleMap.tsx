import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { useState, useCallback } from 'react'
import type { Place } from './types'

interface MapComponentProps {
  places: Place[]
  userCoords?: { lat: number; lng: number } | null
}

const containerStyle = { width: '100%', height: '400px' }

export function MapComponent({ places, userCoords }: MapComponentProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  
  // Filter places that have coordinates
  const placesWithCoords = places.filter(place => place.lat && place.lng)
  
  // Calculate center point (average of all place coordinates)
  const centerLat = placesWithCoords.reduce((sum, place) => sum + (place.lat || 0), 0) / placesWithCoords.length
  const centerLng = placesWithCoords.reduce((sum, place) => sum + (place.lng || 0), 0) / placesWithCoords.length
  const center = { lat: centerLat, lng: centerLng }

  const handleMarkerClick = useCallback((place: Place) => {
    setSelectedPlace(selectedPlace?.id === place.id ? null : place)
  }, [selectedPlace])

  if (placesWithCoords.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Map View</h2>
      <div className="w-full rounded-lg overflow-hidden border border-slate-200">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
          >
            {/* Place markers */}
            {placesWithCoords.map((place) => (
              <Marker
                key={place.id}
                position={{ lat: place.lat!, lng: place.lng! }}
                title={place.name}
                onClick={() => handleMarkerClick(place)}
              />
            ))}

            {/* InfoWindow for selected place */}
            {selectedPlace && (
              <InfoWindow
                position={{ lat: selectedPlace.lat!, lng: selectedPlace.lng! }}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div>
                  <h3 className="font-semibold text-lg">{selectedPlace.name}</h3>
                  {selectedPlace.towns && (
                    <p className="text-sm text-slate-600 mt-1">
                      {selectedPlace.towns.join(', ')}
                    </p>
                  )}
                  {selectedPlace.primaryCategory && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        <span className="px-2 py-1 bg-slate-100 text-xs rounded-full">
                          {selectedPlace.primaryCategory}
                        </span>
                    </div>
                  )}
                 
                </div>
              </InfoWindow>
            )}
            
            {/* User location marker */}
            {userCoords && (
              <Marker
                position={userCoords}
                title="Your Location"
                icon={{
                  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="2"/>
                      <text x="12" y="16" text-anchor="middle" fill="white" font-size="10" font-weight="bold">U</text>
                    </svg>
                  `)
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      <p className="text-sm text-slate-600 mt-2">
        Showing {placesWithCoords.length} places with location data
      </p>
    </div>
  )
}
