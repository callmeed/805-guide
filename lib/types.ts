// types.ts
export type Category =
  | "food"
  | "wine"
  | "bar"
  | "coffee"
  | "activity"
  | "outdoor"
  | "stay" // hotels, inns, etc.
  | "hiking"
  | "shopping"
  | "art"
  | "music"
  | "history"
  | "nature"
  | "sports"
  | "other"

export interface Place {
  id: string
  name: string
  towns: string[] // e.g. ['Los Olivos']
  categories: Category[] // <-- multiple
  primaryCategory?: Category // optional for icon/sorting
  tags?: string[] // kid-friendly, views, live-music, etc.
  notes?: string
  address?: string
  phone?: string
  url?: string
  lat?: number
  lng?: number
}
