import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '@features/counter/redux/reducer';
import productsReducer from '@stores/features/products/productsSlice';
import cartReducer from '@stores/features/cart/cartSlice';
import registrationReducer from '@stores/features/registration/registrationSlice';

const appReducer = combineReducers({ 
  counter: counterReducer,
  products: productsReducer,
  cart: cartReducer,
  registration: registrationReducer,
});
export type RootState = ReturnType<typeof appReducer>;