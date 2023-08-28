import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filters: {
      all: false,
      nonStops: false,
      oneStop: false,
      twoStops: false,
      threeStops: false,
    },
    show: 5,
    filteredCheckBox: [],
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters = action.payload;
    },
    setFilteredCheckBox: (state, action) => {
      state.filteredCheckBox = action.payload;
    },
    setShow: (state) => {
      return { ...state, show: state.show + 5 };
    },
    setResShow(state) {
      state.show = 5;
    },
  },
});

export const { setFilter, setFilteredCheckBox, setShow, setResShow } = filterSlice.actions;
export default filterSlice.reducer;
