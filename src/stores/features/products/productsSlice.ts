import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productsApi from '@/api/productsApi';
import { Product, ProductsState, BaseState } from '@/types';

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try { return await productsApi.getAllProducts(); }
  catch (e:any) { return rejectWithValue(e.message || 'Unknown error'); }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id: number|string, { rejectWithValue }) => {
  try { return await productsApi.getProductById(id); }
  catch (e:any) { return rejectWithValue(e.message || 'Unknown error'); }
});

const initialState: ProductsState = { 
  items: [], 
  loading: false, 
  error: null, 
  selectedProduct: null 
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchAllProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchAllProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchProductById.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.loading = false; state.selectedProduct = action.payload; })
      .addCase(fetchProductById.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  }
});

export const { clearSelectedProduct, clearError } = productsSlice.actions;
export default productsSlice.reducer;
