import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import noteReducer from './notes/notesSlice';

const Store = configureStore({
  reducer: { auth: authReducer, notes: noteReducer },
});

export default Store;
