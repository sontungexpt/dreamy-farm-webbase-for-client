import { configureStore } from '@reduxjs/toolkit';
import { orderReducer, userReducer } from './slices';

const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
  },
});

export default store;
