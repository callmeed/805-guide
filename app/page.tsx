"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { List, Map, Filter, Search } from "lucide-react"
import { PlaceCard } from "@/components/place-card"
import { CategoryFilter } from "@/components/category-filter"
import { SimpleMap } from "@/components/simple-map"
import type { Place, Category } from "@/lib/types"
import placesData from "@/data/places.json"

export default function HomePage() {
  const [view, setView] = useState<"list" | "map">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  const places = placesData as Place[]

  // Filter places based on search and categories
  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.towns.some((town) => town.toLowerCase().includes(searchQuery.toLowerCase())) ||
        place.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.some((category) => place.categories.includes(category))

      return matchesSearch && matchesCategory
    })
  }, [places, searchQuery, selectedCategories])

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
  }

  const handleViewMap = (place: Place) => {
    setSelectedPlace(place)
    setView("map")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-heading font-black text-2xl text-foreground">Local Directory</h1>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("list")}
                className="flex items-center gap-2"
              >
                <List className="w-4 h-4" />
                List
              </Button>
              <Button
                variant={view === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("map")}
                className="flex items-center gap-2"
              >
                <Map className="w-4 h-4" />
                Map
              </Button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search places, towns, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Filter className="w-4 h-4" />
                  Filter
                  {selectedCategories.length > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                      {selectedCategories.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filter by Category</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <CategoryFilter
                    selectedCategories={selectedCategories}
                    onCategoryToggle={handleCategoryToggle}
                    onClearAll={handleClearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {view === "list" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredPlaces.length} place{filteredPlaces.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {filteredPlaces.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No places match your search criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategories([])
                  }}
                  className="mt-4"
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} onViewMap={() => handleViewMap(place)} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="h-[calc(100vh-200px)]">
            <SimpleMap places={filteredPlaces} selectedPlace={selectedPlace} onPlaceSelect={setSelectedPlace} />
          </div>
        )}
      </main>
    </div>
  )
}
