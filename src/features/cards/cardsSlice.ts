import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardResponse } from "../../types/Card";
import { Card } from "../../types/Card";

// Define a type for the slice state
interface CardsState {
  cards: Card[];
  totalElements: number;
  currentPage: number;
  pageSize: number;
  status: "idle" | "loading" | "succeeded" | "failed";
}

// Initial state
const initialState: CardsState = {
  cards: [],
  totalElements: 0,
  currentPage: 0,
  pageSize: 20,
  status: "idle",
};

// Create async thunk for fetching cards with filters
export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async ({
    page,
    size,
    search = "",
    rarity = "",
    type = "",
    color = "",
    set = "",
  }: {
    page: number;
    size: number;
    search?: string;
    rarity?: string;
    type?: string;
    color?: string;
    set?: string;
  }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/cards/?page=${page}&size=${size}&search=${search}&rarity=${rarity}&type=${type}&color=${color}&set=${set}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: CardResponse = await response.json();
      console.log("API Response:", data); // Log API response
      return {
        cards: data.content,
        totalElements: data.totalElements,
        currentPage: data.pageable.pageNumber,
        pageSize: data.pageable.pageSize,
      };
    } catch (error) {
      console.error("Fetch cards failed:", error); // Log error
      throw error;
    }
  }
);

// Create slice
const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCards.fulfilled,
        (
          state,
          action: PayloadAction<{
            cards: Card[];
            totalElements: number;
            currentPage: number;
            pageSize: number;
          }>
        ) => {
          console.log("Cards Loaded:", action.payload.cards); // Log cards loaded
          state.cards = action.payload.cards;
          state.totalElements = action.payload.totalElements;
          state.currentPage = action.payload.currentPage;
          state.pageSize = action.payload.pageSize;
          state.status = "succeeded";
        }
      )
      .addCase(fetchCards.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default cardsSlice.reducer;
