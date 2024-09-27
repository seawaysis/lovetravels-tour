import { createSlice /*,current*/} from '@reduxjs/toolkit';
import agentThunks from './agentThunks';

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
      builder.addCase(agentThunks.getPackage.pending, (state) => {
        //...
      })
      builder.addCase(agentThunks.getPackage.rejected, (state) => {
        //...
      })
      builder.addCase(agentThunks.getPackage.fulfilled, (state, action) => {
          //console.log(action.payload.data)
          state.agentPackage = action.payload.data
        //slice.caseReducers.setData(state, action);
      })
    },
  }) 

export const { updateAgentPackage } = packageTour.actions
export default packageTour.reducer