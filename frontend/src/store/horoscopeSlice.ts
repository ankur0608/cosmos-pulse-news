// store/horoscopeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface HoroscopeDetails {
  horoscope: string;
  luckyNumber: string | null;
  luckyColor: string | null;
  remedy: string | null;
  ratings: Record<string, number>;
}

interface HoroscopeState {
  english: Record<string, HoroscopeDetails>;
  loading: boolean;
  error: string | null;
}

const initialState: HoroscopeState = {
  english: {},
  loading: false,
  error: null,
};

// Async thunk to fetch all horoscopes
export const fetchHoroscopes = createAsyncThunk(
  "horoscope/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/api/horoscope/english");
      const data = await res.json();
      if (!data.success) throw new Error("Failed to fetch horoscopes");
      return data.data.english;
    } catch (err: any) {
      return rejectWithValue(err.message);
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
      .addCase(fetchHoroscopes.fulfilled, (state, action) => {
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
