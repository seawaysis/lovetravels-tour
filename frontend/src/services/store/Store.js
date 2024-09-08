import { configureStore } from '@reduxjs/toolkit';
import roleStore from './Reducer'
import agentPackage from './agentPackageTourReducer'

export default configureStore({
    reducer: {
        Roles: roleStore,
        AgentPackage: agentPackage,
    }
})
