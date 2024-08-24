import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  offlineMode: boolean;
  themeMode: 'light' | 'dark';
}

const initialState: SettingsState = {
  offlineMode: false,
  themeMode: 'light', // default to light mode
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleOfflineMode(state) {
      state.offlineMode = !state.offlineMode;
    },
    toggleThemeMode(state, action: PayloadAction<'light' | 'dark'>) {
      state.themeMode = action.payload;
    },
    clearLocalStorage() {
      localStorage.clear();
    },
  },
});

export const { toggleOfflineMode, toggleThemeMode, clearLocalStorage } = settingsSlice.actions;
export default settingsSlice.reducer;

