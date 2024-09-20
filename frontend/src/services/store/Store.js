import { configureStore } from '@reduxjs/toolkit';
import roleStore from './Reducer'
import agentPackage from './agentPackageTourReducer'
import packageSearch from './userPackageTourReducer'

export default configureStore({
    reducer: {
        Roles: roleStore,
        AgentPackage: agentPackage,
        PackageSearch: packageSearch
    }
})
