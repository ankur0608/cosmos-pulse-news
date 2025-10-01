// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchFinancialsApi } from "../api/financialApi";

// export const fetchFinancials = createAsyncThunk(
//   "financials/fetchFinancials",
//   async (company, thunkAPI) => {
//     const response = await fetchFinancialsApi(company);
//     return response.data; // array of financials
//   }
// );

// const financialsSlice = createSlice({
//   name: "financials",
//   initialState: {
//     data: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFinancials.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFinancials.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchFinancials.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default financialsSlice.reducer;
