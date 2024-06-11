import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
  const response = await axios.get('http://localhost:8000/messages');
  return response.data;
});

export const sendMessage = createAsyncThunk('messages/sendMessage', async (message) => {
  const response = await axios.post('http://localhost:8000/messages', message);
  return response.data;
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [], // Ensure messages is initialized as an empty array
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export default messagesSlice.reducer;
