import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0, 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      state.count = action.payload;
    },
    incrementCartCount: (state) => {
      state.count += 1;
    },
    decrementCartCount: (state) => {
      state.count = Math.max(0, state.count - 1);
    },
  },
});

export const { setCartCount, incrementCartCount, decrementCartCount } = cartSlice.actions;
export default cartSlice.reducer;
