import type React from "react"
import {
  UtensilsCrossed,
  Wine,
  Coffee,
  TreePine,
  Palette,
  Music,
  Landmark,
  Leaf,
  Dumbbell,
  Bed,
  ShoppingBag,
  MapPin,
} from "lucide-react"
import type { Category } from "@/lib/types"

const categoryIcons: Record<Category, React.ComponentType<any>> = {
  food: UtensilsCrossed,
  wine: Wine,
  bar: Wine,
  coffee: Coffee,
  activity: MapPin,
  outdoor: TreePine,
  stay: Bed,
  hiking: TreePine,
  shopping: ShoppingBag,
  art: Palette,
  music: Music,
  history: Landmark,
  nature: Leaf,
  sports: Dumbbell,
  other: MapPin,
}

interface CategoryIconProps {
  category: Category
  className?: string
}

export function CategoryIcon({ category, className = "w-5 h-5" }: CategoryIconProps) {
  const Icon = categoryIcons[category]
  return <Icon className={className} />
}
