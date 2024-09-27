import { createSlice ,current} from '@reduxjs/toolkit'
import agentThunks from './agentThunks';

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
      builder.addCase(agentThunks.getAllBooking.pending, (state) => {
        //...
      })
      builder.addCase(agentThunks.getAllBooking.rejected, (state) => {
        //...
      })
      builder.addCase(agentThunks.getAllBooking.fulfilled, (state, action) => {
          //console.log('extra : '+action.payload)
          state.allBooking = action.payload
        //slice.caseReducers.setData(state, action);
      })
    },
});

export const { updateAllBooking } = allBooking.actions;
export default allBooking.reducer;