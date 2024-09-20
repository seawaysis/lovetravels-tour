import { createSlice ,current} from '@reduxjs/toolkit'
import getRole from "./thunks";
import LocalStorages from '../localStorages'
// const initialState = {
//     role: 'user',
//     loading: true
// }
const initialState = LocalStorages.getInitRole()
const roleStore = createSlice({
    name: "setRole",
    initialState,
    reducers: {
        updateRole: (state, action) => {
            state.role = action.payload
            console.log('current : '+current(state))
        }
    },
    extraReducers: (builder) => {
      builder.addCase(getRole.pending, (state) => {
        //...
      })
      builder.addCase(getRole.rejected, (state) => {
        //...
      })
      builder.addCase(getRole.fulfilled, (state, action) => {
          //console.log('extra : '+action.payload)
          state.role = action.payload
        //slice.caseReducers.setData(state, action);
      })
    },
  }) 

export const { updateRole } = roleStore.actions
export default roleStore.reducer