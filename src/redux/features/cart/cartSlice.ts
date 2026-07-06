import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICart {
    cart: ICartItem[];
}

const initialState: ICart = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const exists = state.cart.find((item) => item.id === action.payload.id);
            if (exists) return;
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.cart = [];
        },
    },
});
export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
