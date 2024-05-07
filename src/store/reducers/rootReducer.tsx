import { createSlice } from "@reduxjs/toolkit";

interface RootState {
  user: any;
  books: any[];
}

const initialState: RootState = {
  user: {},
  books: [],
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setBooks: (state, { payload }) => {
      state.books = payload;
    },
  },
});

export const { setUser, setBooks } = rootSlice.actions;

export default rootSlice.reducer;
