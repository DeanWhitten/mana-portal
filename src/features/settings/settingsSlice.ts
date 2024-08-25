import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  saveSettingsToIndexedDB,
  loadSettingsFromIndexedDB,
} from "../../utils/indexedDB";
import { SettingsState } from "../../types/Settings";

const initialState: SettingsState = {
  offlineMode: false,
  themeMode: "light", // default to light mode
};

// Define the thunk
export const fetchSettings = createAsyncThunk<SettingsState>(
  "settings/fetchSettings",
  async (_, { rejectWithValue }) => {
    try {
      const settings = await loadSettingsFromIndexedDB();
      return settings;
    } catch (error) {
      return rejectWithValue("Failed to load settings");
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleOfflineMode(state) {
      state.offlineMode = !state.offlineMode;
      console.log("Saving settings with offlineMode:", state.offlineMode);
      saveSettingsToIndexedDB({ ...state });
    },
    setThemeMode(state, action: PayloadAction<"light" | "dark">) {
      state.themeMode = action.payload;
      console.log("Saving settings with themeMode:", state.themeMode);
      saveSettingsToIndexedDB({ ...state });
    },
    clearLocalStorage() {
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        console.error(action.payload); // Log the error
      });
  },
});

export const { toggleOfflineMode, setThemeMode, clearLocalStorage } =
  settingsSlice.actions;

export default settingsSlice.reducer;
