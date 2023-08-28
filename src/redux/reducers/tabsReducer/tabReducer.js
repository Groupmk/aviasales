import { createSlice } from '@reduxjs/toolkit';

const tabFilterSlice = createSlice({
  name: 'tabFilter',
  initialState: {
    activeTab: 'cheapest',
    filteredTicket: [],
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setFilteredTicket: (state, action) => {
      state.filteredTicket = action.payload;
    },
  },
});

export const { setActiveTab, setFilteredTicket } = tabFilterSlice.actions;
export default tabFilterSlice.reducer;
