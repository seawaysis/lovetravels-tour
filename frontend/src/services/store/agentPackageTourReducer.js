import { createSlice /*,current*/} from '@reduxjs/toolkit';
import getPackage from './agentThunks';

const packageTour = createSlice({
    name: "setAgentPackageTour",
    initialState : {agentPackage : []},
    reducers: {
        updateAgentPackage: (state, action) => {
            state.agentPackage = action.payload
            //console.log('current : '+current(state))
        }
    },
    extraReducers: (builder) => {
      builder.addCase(getPackage.pending, (state) => {
        //...
      })
      builder.addCase(getPackage.rejected, (state) => {
        //...
      })
      builder.addCase(getPackage.fulfilled, (state, action) => {
          //console.log(action.payload.data)
          state.agentPackage = action.payload.data
        //slice.caseReducers.setData(state, action);
      })
    },
  }) 

export const { updateAgentPackage } = packageTour.actions
export default packageTour.reducer