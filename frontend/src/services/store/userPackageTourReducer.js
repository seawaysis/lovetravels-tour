import { createSlice ,current} from '@reduxjs/toolkit'

const packageTourSearch = createSlice({
  name: "setPackageTourSearch",
  initialState : {packageSearch : []},
  reducers: {
    updatePackageSearch: (state, action) => {
      //console.log(current(state))
      state.packageSearch = action.payload;
    }
  }
});

export const { updatePackageSearch } = packageTourSearch.actions;
export default packageTourSearch.reducer;