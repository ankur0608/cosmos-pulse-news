import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API_BASE_URL from "./apiConfig"; // Import the central API configuration

// 1. Define the types for the horoscope data
type HoroscopeData = {
  [sign: string]: {
    date: string;
    horoscope: string;
    icon: string;
    sign: string;
  };
};

// 2. Define the type for the slice's state
interface HoroscopeState {
  english: HoroscopeData;
  loading: boolean;
  error: string | null;
}

// 3. Apply the type to the initial state
const initialState: HoroscopeState = {
  english: {},
  loading: false,
  error: null,
};

// 4. Add the return type to the async thunk
export const fetchHoroscopes = createAsyncThunk<HoroscopeData>(
  "horoscope/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      // Use the imported, environment-aware base URL
      const res = await fetch(`${API_BASE_URL}/horoscope/english`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch horoscopes from API");
      }
      return data.data.english;
    } catch (err: any) {
      return rejectWithValue(err.message || "An unknown error occurred");
    }
  }
);

const horoscopeSlice = createSlice({
  name: "horoscope",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHoroscopes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHoroscopes.fulfilled, (state, action: PayloadAction<HoroscopeData>) => {
        state.loading = false;
        state.english = action.payload;
      })
      .addCase(fetchHoroscopes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default horoscopeSlice.reducer;
