import { openDB } from "idb";
import { Card } from "../types/Card";
import { SettingsState } from "../types/Settings";

// Open the IndexedDB and upgrade schema if necessary
const dbPromise = openDB("ManaVaultDB", 2, {
  // Incremented version number
  upgrade(db) {
    if (!db.objectStoreNames.contains("favorites")) {
      db.createObjectStore("favorites", { keyPath: "cardId" });
    }
    if (!db.objectStoreNames.contains("settings")) {
      db.createObjectStore("settings", { keyPath: "id" });
    }
  },
});

const defaultSettings: SettingsState = {
  offlineMode: false,
  themeMode: "light",
};

// Add favorite card
export const addFavorite = async (card: Card) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("favorites", "readwrite");
    const store = tx.objectStore("favorites");
    await store.put(card); // Put or update card in the store
    await tx.done; // Ensure transaction is completed
  } catch (error) {
    console.error("Failed to add favorite:", error);
  }
};

// Remove favorite card
export const removeFavorite = async (cardId: string) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction("favorites", "readwrite");
    const store = tx.objectStore("favorites");
    await store.delete(cardId); // Delete card by its ID
    await tx.done; // Ensure transaction is completed
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
    const favorites = await store.getAll(); // Retrieve all cards from the store
    await tx.done; // Ensure transaction is completed
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
    await store.clear(); // Clear all entries from the store
    await tx.done; // Ensure transaction is completed
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
    return defaultSettings; // Return default settings if no settings are found
  } catch (error) {
    console.error("Failed to load settings:", error);
    return defaultSettings; // Return default settings in case of error
  }
};
