"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, ExternalLink, MapPin } from "lucide-react"
import type { Place } from "@/lib/types"
import { CategoryIcon } from "./category-icons"

interface PlaceCardProps {
  place: Place
  onViewMap?: () => void
}

export function PlaceCard({ place, onViewMap }: PlaceCardProps) {
  return (
    <Card className="p-4 bg-card border-border">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
          <CategoryIcon category={place.primaryCategory || place.categories[0]} className="w-6 h-6 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading font-bold text-lg text-foreground">{place.name}</h3>
              <p className="text-sm text-muted-foreground">{place.towns.join(", ")}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {place.categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>

          {place.notes && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{place.notes}</p>}

          {place.tags && place.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {place.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {place.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{place.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 mt-3">
            {place.phone && (
              <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                <Phone className="w-3 h-3" />
                Call
              </Button>
            )}
            {place.url && (
              <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                <ExternalLink className="w-3 h-3" />
                Visit
              </Button>
            )}
            {place.lat && place.lng && onViewMap && (
              <Button
                size="sm"
                variant="outline"
                onClick={onViewMap}
                className="flex items-center gap-1 bg-transparent"
              >
                <MapPin className="w-3 h-3" />
                Map
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
