
export type Category =
  | 'food'
  | 'wine'
  | 'bar'
  | 'coffee'
  | 'activity'
  | 'outdoor'
  | 'stay'
  | 'hiking'
  | 'beaches'
  | 'shopping'
  | 'other'

export interface Place {
  id: string;                    // unique slug (e.g. "matteis-tavern-los-olivos")
  name: string;                  // display name
  towns: string[];               // ["Los Olivos", "Santa Ynez"]
  categories: Category[];        // multiple categories allowed
  primaryCategory?: Category;    // optional: pick one to use as default/icon

  tags?: string[];               // ["kid-friendly", "views", "cocktails"]

  notes?: string;                // freeform blurb
  address?: string;
  phone?: string;
  url?: string;

  lat?: number;
  lng?: number;
  mapUrl?: string;
  
}