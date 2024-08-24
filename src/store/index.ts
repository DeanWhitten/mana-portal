import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../features/cards/cardsSlice';
import settingsReducer from '../features/settings/settingsSlice';

const store = configureStore({
  reducer: {
    
    cards: cardsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
