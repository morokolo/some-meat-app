import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productsApi from '@/api/productsApi';
import * as mealApi from '@/api/mealApi';
import { Product, ProductsState, BaseState } from '@/types';

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try { return await productsApi.getAllProducts(); }
  catch (e:any) { return rejectWithValue(e.message || 'Unknown error'); }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id: number|string, { rejectWithValue }) => {
  try { return await productsApi.getProductById(id); }
  catch (e:any) { return rejectWithValue(e.message || 'Unknown error'); }
});

// Meals (TheMealDB)
export const fetchMealCategories = createAsyncThunk('products/fetchMealCategories', async (_, { rejectWithValue }) => {
  try { return await mealApi.getMealCategories(); }
  catch (e:any) { return rejectWithValue(e.message || 'Unknown error'); }
});

export const fetchMealsByCategory = createAsyncThunk('products/fetchMealsByCategory', async (category: string, { rejectWithValue }) => {
  try { return await mealApi.getMealsByCategory(category); }
  catch (e:any) { return rejectWithValue(e.message || 'Unknown error'); }
});

export const fetchAllMeals = createAsyncThunk('products/fetchAllMeals', async (_, { rejectWithValue }) => {
  try { return await mealApi.getAllMeals(); }
  catch (e:any) { return rejectWithValue(e.message || 'Unknown error'); }
});

const initialState: ProductsState = { 
  items: [], 
  loading: false, 
  error: null, 
  selectedProduct: null,
  // extra fields for meals
  mealCategories: [],
  useMealsApi: false,
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
      .addCase(fetchProductById.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      // Meals
      .addCase(fetchMealCategories.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchMealCategories.fulfilled, (state, action) => { state.loading = false; state.mealCategories = action.payload as string[]; state.useMealsApi = true; })
      .addCase(fetchMealCategories.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchMealsByCategory.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchMealsByCategory.fulfilled, (state, action) => {
        state.loading = false; 
        // Map MealDB items to Product-like minimal shape for list rendering
        const meals = (action.payload as any[]).map(m => ({
          id: Number(m.idMeal),
          title: m.strMeal,
          price: 0,
          description: '',
          category: '',
          image: m.strMealThumb,
          rating: { rate: 0, count: 0 },
        }));
        state.items = meals as unknown as Product[];
        state.useMealsApi = true;
      })
      .addCase(fetchMealsByCategory.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchAllMeals.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchAllMeals.fulfilled, (state, action) => {
        state.loading = false;
        const meals = (action.payload as any[]).map(m => ({
          id: Number(m.idMeal),
          title: m.strMeal,
          price: 0,
          description: '',
          category: '',
          image: m.strMealThumb,
          rating: { rate: 0, count: 0 },
        }));
        state.items = meals as unknown as Product[];
        state.useMealsApi = true;
      })
      .addCase(fetchAllMeals.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  }
});

export const { clearSelectedProduct, clearError } = productsSlice.actions;
export default productsSlice.reducer;
