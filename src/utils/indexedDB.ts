import { openDB, IDBPDatabase } from "idb";
import { Card } from "../types/Card";
import { SettingsState } from "../types/Settings";

// Open the IndexedDB and upgrade schema if necessary
const dbPromise = openDB("ManaVaultDB", 2, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("favorites")) {
      db.createObjectStore("favorites", { keyPath: "cardId" });
    }
    if (!db.objectStoreNames.contains("settings")) {
      db.createObjectStore("settings", { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains("catalog")) {
      db.createObjectStore("catalog", { keyPath: "cardId" });
    }
  },
});

const defaultSettings: SettingsState = {
  offlineMode: false,
  themeMode: "light",
};

// Add a favorite card
export const addFavorite = async (card: Card) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("favorites", "readwrite");
    const store = tx.objectStore("favorites");
    await store.put(card);
    await tx.done;
  } catch (error) {
    console.error("Failed to add favorite:", error);
  }
};

// Remove a favorite card
export const removeFavorite = async (cardId: string) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("favorites", "readwrite");
    const store = tx.objectStore("favorites");
    await store.delete(cardId);
    await tx.done;
  } catch (error) {
    console.error("Failed to remove favorite:", error);
  }
};

// Get all favorite cards
export const getFavorites = async (): Promise<Card[]> => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("favorites", "readonly");
    const store = tx.objectStore("favorites");
    const favorites = await store.getAll();
    await tx.done;
    return favorites;
  } catch (error) {
    console.error("Failed to get favorites:", error);
    return [];
  }
};

// Clear all favorite cards
export const clearAllFavorites = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("favorites", "readwrite");
    const store = tx.objectStore("favorites");
    await store.clear();
    await tx.done;
  } catch (error) {
    console.error("Failed to clear all favorites:", error);
  }
};

// Save settings to IndexedDB
export const saveSettingsToIndexedDB = async (settings: SettingsState) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("settings", "readwrite");
    const store = tx.objectStore("settings");
    await store.put({ id: "settings", ...settings });
    await tx.done;
    console.log("Settings saved successfully");
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
};

// Load settings from IndexedDB
export const loadSettingsFromIndexedDB = async (): Promise<SettingsState> => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("settings", "readonly");
    const store = tx.objectStore("settings");
    const result = await store.get("settings");
    await tx.done;
    if (result) {
      console.log("Settings loaded:", result);
      return { offlineMode: result.offlineMode, themeMode: result.themeMode };
    }
    console.log("No settings found, returning default settings");
    return defaultSettings;
  } catch (error) {
    console.error("Failed to load settings:", error);
    return defaultSettings;
  }
};

// Save an array of cards to IndexedDB
export const saveCardsToCatalog = async (cards: Card[]) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("catalog", "readwrite");
    const store = tx.objectStore("catalog");

    cards.forEach((card) => {
      if (!card.cardId) {
        console.error('Card is missing "cardId" field', card);
        return;
      }
      store.put(card);
    });

    await tx.done;
  } catch (error) {
    console.error("Failed to save cards to catalog:", error);
  }
};

// Get the number of cards in the catalog
export const getCatalogCount = async (): Promise<number> => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("catalog", "readonly");
    const store = tx.objectStore("catalog");
    const count = await store.count();
    await tx.done;
    return count;
  } catch (error) {
    console.error("Failed to get catalog count:", error);
    return 0;
  }
};

// Clear all cards from the 'catalog' store
export const clearCatalog = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("catalog", "readwrite");
    const store = tx.objectStore("catalog");
    await store.clear();
    await tx.done;
    console.log("Catalog cleared successfully");
  } catch (error) {
    console.error("Failed to clear catalog:", error);
  }
};
