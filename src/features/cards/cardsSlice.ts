import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardResponse, Card } from "../../types/Card";
import { getCardsFromCatalog } from "../../utils/indexedDB";

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
      return {
        cards: data.content,
        totalElements: data.totalElements,
        currentPage: data.pageable.pageNumber,
        pageSize: data.pageable.pageSize,
      };
    } catch (error) {
      console.error("Fetch cards failed:", error);

      // If the API fetch fails, fall back to IndexedDB
      const localCards = await getCardsFromCatalog();

      // Filter and search logic for IndexedDB cards
      const filteredCards = localCards.filter((card) => {
        return (
          (search ? card.name.toLowerCase().includes(search.toLowerCase()) : true) &&
          (rarity ? card.rarity === rarity : true) &&
          (type ? card.typeLine.toLowerCase().includes(type.toLowerCase()) : true) &&
          (color ? card.colors.includes(color) : true) &&
          (set ? card.setName === set : true)
        );
      });

      // Paginate the filtered cards
      const startIndex = page * size;
      const paginatedCards = filteredCards.slice(startIndex, startIndex + size);

      return {
        cards: paginatedCards,
        totalElements: filteredCards.length,
        currentPage: page,
        pageSize: size,
      };
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
