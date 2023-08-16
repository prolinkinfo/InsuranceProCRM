
import { configureStore } from '@reduxjs/toolkit';
import leadReducer from './slices/UserSlice'

const store = configureStore({
  reducer: {
    leads: leadReducer,
  },
});

export default store;