import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from '@/api/authApi';
import { AuthState, LoginCredentials, RegistrationData } from '@/types';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginCredentials, { rejectWithValue }) => {
    try {
      return await authApi.login(payload.username, payload.password);
    } catch (e: any) {
      return rejectWithValue(e.message || 'Unknown error');
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload: RegistrationData, { rejectWithValue }) => {
    try {
      return await authApi.register(payload);
    } catch (e: unknown) {
      return rejectWithValue(e.message || 'Unknown error');
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = registrationSlice.actions;
export default registrationSlice.reducer;
