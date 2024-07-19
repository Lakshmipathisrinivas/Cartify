import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            // Use filter to create a new array without the last item
            state.items = state.items.slice(0, -1);
        },
        deleteItem: (state, action) => {
            // Use filter to create a new array without the specified item
            state.items = state.items.filter((item) => item.id !== action.payload.id);
          },
        clearCart: (state, action) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearCart, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
