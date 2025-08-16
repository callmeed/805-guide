"use client"

import { useEffect, useRef } from "react"
import type { Place } from "@/lib/types"

interface SimpleMapProps {
  places: Place[]
  selectedPlace?: Place | null
  onPlaceSelect?: (place: Place) => void
}

export function SimpleMap({ places, selectedPlace, onPlaceSelect }: SimpleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  // Filter places that have coordinates
  const placesWithCoords = places.filter((place) => place.lat && place.lng)

  useEffect(() => {
    console.log("[v0] Map component mounted with places:", placesWithCoords.length)
  }, [placesWithCoords.length])

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      {/* Placeholder map with pins */}
      <div ref={mapRef} className="w-full h-full bg-gradient-to-br from-muted to-muted/50 relative">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-foreground/20" />
            ))}
          </div>
        </div>

        {/* Place pins */}
        {placesWithCoords.map((place, index) => {
          // Simple positioning based on coordinates (mock positioning)
          const x = (((place.lng! + 118.3) * 1000) % 80) + 10
          const y = (((place.lat! - 34) * 1000) % 80) + 10
          const isSelected = selectedPlace?.id === place.id

          return (
            <button
              key={place.id}
              onClick={() => onPlaceSelect?.(place)}
              className={`absolute w-6 h-6 rounded-full border-2 border-background transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                isSelected ? "bg-primary border-primary-foreground shadow-lg scale-110" : "bg-accent hover:bg-primary"
              }`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
              title={place.name}
            >
              <span className="sr-only">{place.name}</span>
            </button>
          )
        })}

        {/* Selected place info */}
        {selectedPlace && (
          <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg p-3 shadow-lg">
            <h4 className="font-heading font-semibold text-sm">{selectedPlace.name}</h4>
            <p className="text-xs text-muted-foreground">{selectedPlace.towns.join(", ")}</p>
            {selectedPlace.notes && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{selectedPlace.notes}</p>
            )}
          </div>
        )}

        {placesWithCoords.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">No places with coordinates to display</p>
          </div>
        )}
      </div>
    </div>
  )
}
