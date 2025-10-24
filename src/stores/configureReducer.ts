import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '@features/counter/redux/reducer';

const appReducer = combineReducers({ counter: counterReducer });
export type RootState = ReturnType<typeof appReducer>;