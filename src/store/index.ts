import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cardsReducer from "../features/cards/cardsSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import settingsReducer from "../features/settings/settingsSlice";

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    favorites: favoritesReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
