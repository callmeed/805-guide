import { useState, useEffect } from 'react'
import type { Place, Category } from './types'
import { PlaceCard } from './PlaceCard'
import { MapComponent } from './GoogleMap'

export default function App() {
  const [places, setPlaces] = useState<Place[]>([])
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [selectedTown, setSelectedTown] = useState<string | 'all'>('all')

  useEffect(() => {
    fetch('/places.json')
      .then(res => res.json())
      .then(setPlaces)
  }, [])

  // 🔹 Effect 2: Request location on load
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported by this browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
        setError(null)
      },
      (err) => {
        setError(err.message)
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    )
  }, [])


  return (
    <main className="min-h-dvh bg-slate-50 text-slate-900 p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Ed's Central Coast Guide</h1>
        <p className="mt-2 opacity-80">{places.length} places found</p>
        
        {/* Filters */}
        <div className="mt-4 flex gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label htmlFor="category-filter" className="block text-sm font-medium text-slate-700 mb-2">
              Filter by category:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
              className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="food">Food</option>
              <option value="wine">Wine</option>
              <option value="bar">Bar</option>
              <option value="coffee">Coffee</option>
              <option value="activity">Activity</option>
              <option value="outdoor">Outdoor</option>
              <option value="stay">Stay</option>
              <option value="hiking">Hiking</option>
              <option value="beaches">Beaches</option>
              <option value="shopping">Shopping</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Town Filter */}
          <div className="flex-1">
            <label htmlFor="town-filter" className="block text-sm font-medium text-slate-700 mb-2">
              Filter by city or region:
            </label>
            <select
              id="town-filter"
              value={selectedTown}
              onChange={(e) => setSelectedTown(e.target.value)}
              className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Areas</option>
              {Array.from(new Set(places.flatMap(place => place.towns))).sort().map(town => (
                <option key={town} value={town}>{town}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-red-600">Location error: {error}</p>}
        
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {places
            .filter(place => selectedCategory === 'all' || place.categories.includes(selectedCategory))
            .filter(place => selectedTown === 'all' || place.towns.includes(selectedTown))
            .map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
        </div>
        <MapComponent places={places} userCoords={coords} />
        
      </div>
      <div id="footer" className="mt-4 text-sm bg-slate-600 text-white p-4">
          {coords && (
            <p>
              Your location: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
            </p>
          )}
        </div>
    </main>
  )
}