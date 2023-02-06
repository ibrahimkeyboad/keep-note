import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import noteService from './note-service';

const initialState = {
  notes: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  success: false,
  message: '',
};

export const createNote = createAsyncThunk('note/create', async (note, api) => {
  try {
    const { token } = api.getState()?.auth?.user;
    console.log(token);
    await noteService.createNote(note, token);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return api.rejectWithValue(message);
  }
});

export const getNotes = createAsyncThunk('note/get', async (_, api) => {
  try {
    const { token } = api.getState()?.auth?.user;

    return await noteService.getNotes(token);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return api.rejectWithValue(message);
  }
});

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        console.log(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;

export default noteSlice.reducer;
