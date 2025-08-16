"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { Category } from "@/lib/types"
import { CategoryIcon } from "./category-icons"

const allCategories: Category[] = [
  "food",
  "wine",
  "bar",
  "coffee",
  "activity",
  "outdoor",
  "stay",
  "hiking",
  "shopping",
  "art",
  "music",
  "history",
  "nature",
  "sports",
  "other",
]

interface CategoryFilterProps {
  selectedCategories: Category[]
  onCategoryToggle: (category: Category) => void
  onClearAll: () => void
}

export function CategoryFilter({ selectedCategories, onCategoryToggle, onClearAll }: CategoryFilterProps) {
  return (
    <div className="space-y-4">
      {selectedCategories.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          <div className="flex flex-wrap gap-1">
            {selectedCategories.map((category) => (
              <Badge key={category} variant="default" className="flex items-center gap-1">
                <CategoryIcon category={category} className="w-3 h-3" />
                {category}
                <button
                  onClick={() => onCategoryToggle(category)}
                  className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          <Button size="sm" variant="ghost" onClick={onClearAll} className="text-xs">
            Clear all
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {allCategories.map((category) => {
          const isSelected = selectedCategories.includes(category)
          return (
            <Button
              key={category}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryToggle(category)}
              className="flex items-center gap-2 justify-start"
            >
              <CategoryIcon category={category} className="w-4 h-4" />
              <span className="capitalize">{category}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
