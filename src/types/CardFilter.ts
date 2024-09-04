// Define the CardFilter type with optional properties
export interface CardFilter {
  search?: string; // Search term for card name
  rarity?: string; // Card rarity (e.g., "common", "uncommon", "rare", "mythic")
  type?: string; // Card type (e.g., "creature", "enchantment")
  colors?: string[]; // Array of selected colors (e.g., ["red", "blue"])
  set?: string; // Card set (e.g., "core2021", "zendikar")
}
