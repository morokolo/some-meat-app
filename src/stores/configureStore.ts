import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import cartReducer from './features/cart/cartSlice';
import registrationReducer from './features/registration/registrationSlice';
import counterReducer from '@features/counter/redux/reducer';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    registration: registrationReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;