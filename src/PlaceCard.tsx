import type { Place } from './types'
import { Utensils, Wine, Coffee, Heart, TreePine, MapPin, Link, BedDouble, Footprints, ThumbsUp } from "lucide-react"

interface PlaceCardProps {
  place: Place
  userCoords?: { lat: number; lng: number } | null
}

export function PlaceCard({ place, userCoords }: PlaceCardProps) {

  // Calculate distance from user if coordinates are available
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 3959 // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const distance = userCoords && place.lat && place.lng 
    ? calculateDistance(userCoords.lat, userCoords.lng, place.lat, place.lng)
    : null

  function CategoryIcon({ category }: { category: string }) {
    switch (category) {
      case 'food': return <Utensils className="w-5 h-5" />
      case 'wine': return <Wine className="w-5 h-5" />
      case 'bar': return <Wine className="w-5 h-5" />
      case 'coffee': return <Coffee className="w-5 h-5" />
      case 'stay': return <BedDouble className="w-5 h-5" />
      case 'outdoor': return <TreePine className="w-5 h-5" />
      case 'activity': return <ThumbsUp className="w-5 h-5" />  
      case 'hiking': return <Footprints className="w-5 h-5" />
      default: return <Heart className="w-5 h-5" />
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 p-4 shadow-sm">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <CategoryIcon category={place.primaryCategory || 'other'} />
        {place.name}
      </h3>
      {place.towns && (
        <p className="text-sm text-slate-600 mt-1">
          {place.towns.join(', ')}
          {distance && (
            <span className="ml-2 text-slate-400 text-xs">
              {distance.toFixed(1)} miles away
            </span>
          )}
        </p>
      )}
      {place.categories && (
        <div className="flex flex-wrap gap-1 mt-2">
          {place.categories.map((category) => (
            <span key={category} className="px-2 py-1 bg-slate-100 text-xs rounded-full">
              {category}
            </span>
          ))}
        </div>
      )}
      {place.tags && place.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {place.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
      {place.notes && (
        <div className="text-sm text-slate-700 mt-2 mb-6">
          <div className="font-medium">Ed says:</div>
          <div className="italic text-slate-400">"{place.notes}"</div>
        </div>
      )}

      {/* Address and Phone */}
      {place.address && (
        <p className="text-sm text-slate-600 mt-1">{place.address}</p>
      )}
      {place.phone && (
        <p className="text-sm text-slate-600 mt-1">
          <a href={`tel:${place.phone}`} className="hover:underline">
            {place.phone}
          </a>
        </p>
      )}

      {/* Google Maps and Website Links */}
      <div className="flex items-center gap-4 mt-4">
        {place.url && (
          <p className="text-sm mt-1">
            <a href={place.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
              <Link className="w-4 h-4 text-slate-400" /> Website
            </a>
          </p>
        )}
        {place.mapUrl && (
          <p className="text-sm mt-1">
            <a
              href={place.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <MapPin className="w-4 h-4 text-slate-400" />Google Maps
            </a>
          </p>
        )}
        {!place.mapUrl && place.lat && place.lng && (
          <p className="text-sm mt-1">
            <a
              href={`https://www.google.com/maps/@${place.lat},${place.lng},25z`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <MapPin className="w-4 h-4 text-slate-400" />Google Maps
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
