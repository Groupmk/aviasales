import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const _BASE_URL = 'https://aviasales-test-api.kata.academy';

const initialState = {
  tickets: [],
  loading: false,
  error: null,
  stop: false,
  searchId: null,
  show: 5,
};

export const fetchSearchId = createAsyncThunk('fetch/fetchSearchId', async (_, { dispatch }) => {
  try {
    const response = await axios.get(`${_BASE_URL}/search`);
    const data = response.data;
    const searchId = data.searchId;
    dispatch(setSearchId(searchId));
  } catch (error) {
    console.error('An error occurred while fetching searchId:', error);
    throw error.message;
  }
});

export const fetchTickets = createAsyncThunk('fetch/fetchTickets', async (_, { getState, dispatch }) => {
  const { stop, searchId } = getState().fetch;
  if (!stop && searchId) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const response = await axios.get(`${_BASE_URL}/tickets?searchId=${searchId}`);
        const data = response.data;
        const { tickets, stop } = data;

        if (stop) {
          dispatch(setStop());
          break;
        }

        dispatch(addTickets(tickets));
      } catch (error) {
        console.error('An error occurred while fetching tickets:', error);
      }
    }
  }
});

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    setSearchId: (state, action) => {
      state.searchId = action.payload;
    },
    setStop: (state) => {
      state.stop = true;
    },
    addTickets: (state, action) => {
      state.tickets = [...state.tickets, ...action.payload];
    },
    setShow: (state) => {
      return { ...state, show: state.show + 5 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchId.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchSearchId.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchId, setStop, addTickets, setShow } = fetchSlice.actions;
export default fetchSlice.reducer;
