import { configureStore } from '@reduxjs/toolkit';
import roleStore from './Reducer';
import agentPackage from './agentPackageTourReducer';
import agentBooking from './agentBookingReducer';
import packageSearch from './userPackageTourReducer';
import allUserBooking from './userBookingReducher';

export default configureStore({
    reducer: {
        Roles: roleStore,
        AgentPackage: agentPackage,
        AgentBooking: agentBooking,
        PackageSearch: packageSearch,
        AllUserBooking: allUserBooking,
    }
})
