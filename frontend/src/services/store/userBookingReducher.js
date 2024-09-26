import { createSlice ,current} from '@reduxjs/toolkit'
import getAllBooking from './userThunks';

const allBooking = createSlice({
  name: "setAllBooking",
  initialState : {allBooking : []},
  reducers: {
    updateAllBooking: (state, action) => {
      console.log(current(state));
      state.allBooking = action.payload;
    }
  },
  extraReducers: (builder) => {
      builder.addCase(getAllBooking.pending, (state) => {
        //...
      })
      builder.addCase(getAllBooking.rejected, (state) => {
        //...
      })
      builder.addCase(getAllBooking.fulfilled, (state, action) => {
          //console.log('extra : '+action.payload)
          state.allBooking = action.payload
        //slice.caseReducers.setData(state, action);
      })
    },
});

export const { updateAllBooking } = allBooking.actions;
export default allBooking.reducer;