import { useState, useEffect } from 'react'
import type { Place } from './types'
import { PlaceCard } from './PlaceCard'

export default function App() {
  const [places, setPlaces] = useState<Place[]>([])
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null)
  const [error, setError] = useState<string | null>(null)

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
        {coords && (
          <p>
            Your location: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
          </p>
        )}
        {error && <p className="text-red-600">Location error: {error}</p>}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </main>
  )
}