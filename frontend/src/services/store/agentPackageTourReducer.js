import { createSlice /*,current*/} from '@reduxjs/toolkit'
import getPackage from './agentThunks'
const initialState = []
const packageTour = createSlice({
    name: "setAgentPackageTour",
    initialState,
    reducers: {
        updatePackage: (state, action) => {
            state.role = action.payload
            //console.log('current : '+current(state))
        }
    },
    // extraReducers: (builder) => {
    //   builder.addCase(getRole.pending, (state) => {
    //     //...
    //   })
    //   builder.addCase(getRole.rejected, (state) => {
    //     //...
    //   })
    //   builder.addCase(getRole.fulfilled, (state, action) => {
    //       console.log('extra : '+action.payload)
    //       state.role = action.payload
    //     //slice.caseReducers.setData(state, action);
    //   })
    // },
  }) 

export const { updateAgentPackage } = packageTour.actions
export default packageTour.reducer