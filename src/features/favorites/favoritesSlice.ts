import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Card } from "../../types/Card";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
  clearAllFavorites,
} from "../../utils/indexedDB";
import { AppThunk } from "../../store";

interface FavoritesState {
  favoriteCards: Card[];
}

const initialState: FavoritesState = {
  favoriteCards: [],
};

// Define the thunk to fetch favorites
export const fetchFavorites = createAsyncThunk<Card[]>(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const favorites = await getFavorites();
      return favorites;
    } catch (error) {
      return rejectWithValue("Failed to load favorites");
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<Card[]>) {
      state.favoriteCards = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<Card>) {
      const card = action.payload;
      const isFavorited = state.favoriteCards.some(
        (favoriteCard) => favoriteCard.cardId === card.cardId
      );

      if (isFavorited) {
        state.favoriteCards = state.favoriteCards.filter(
          (favoriteCard) => favoriteCard.cardId !== card.cardId
        );
        removeFavorite(card.cardId);
      } else {
        state.favoriteCards.push(card);
        addFavorite(card);
      }
    },
    clearFavorites(state) {
      state.favoriteCards = [];
      clearAllFavorites();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoriteCards = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        console.error(action.payload); // Log the error
      });
  },
});

export const { setFavorites, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
