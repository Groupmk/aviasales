import { configureStore } from '@reduxjs/toolkit';

import fetchSlice from '../reducers/Fetch-reducer/fetchReducer';
import filterSlice from '../reducers/reducerCheckBox/reducerCheckBox';
import tabFilterSlice from '../reducers/tabsReducer/tabReducer';

export const store = configureStore({
  reducer: {
    fetch: fetchSlice,
    checkBox: filterSlice,
    tabsFilter: tabFilterSlice,
  },
});
