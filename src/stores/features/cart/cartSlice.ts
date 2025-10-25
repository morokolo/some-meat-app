import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as cartApi from '@/api/cartApi';
import { CartItem, CartState, Product } from '@/types';

export const fetchCart = createAsyncThunk('cart/fetch', async (userId: number = 1, { rejectWithValue }) => {
  try { return await cartApi.getCart(userId); }
  catch (e:any) { return rejectWithValue(e.message || 'Unknown error'); }
});

export const addToCart = createAsyncThunk('cart/add', async (payload: { cartId:number; productId:number; quantity:number }, { rejectWithValue }) => {
  try { return await cartApi.addToCart(payload.cartId, payload.productId, payload.quantity); }
  catch (e:any) { return rejectWithValue(e.message || 'Unknown error'); }
});

export const removeFromCart = createAsyncThunk('cart/remove', async (payload: { cartId: number; productId: number }, { rejectWithValue }) => {
  try { return await cartApi.removeFromCart(payload.cartId, payload.productId); }
  catch (e:any) { return rejectWithValue(e.message || 'Unknown error'); }
});

export const updateCart = createAsyncThunk('cart/update', async (payload: { cartId:number; productId:number; quantity:number }, { rejectWithValue }) => {
  try { return await cartApi.updateCart(payload.cartId, payload.productId, payload.quantity); }
  catch (e:any) { return rejectWithValue(e.message || 'Unknown error'); }
});

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      
      // Calculate total
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    removeItemFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      
      // Calculate total
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);
      
      if (item) {
        item.quantity += 1;
        // Calculate total
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      }
    },
    
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove item if quantity becomes 0
          state.items = state.items.filter(cartItem => cartItem.id !== productId);
        }
        
        // Calculate total
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchCart.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  }
});

export const { 
  addItemToCart, 
  removeItemFromCart, 
  incrementQuantity, 
  decrementQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
