import UserRegisterPage from '../public/user/pages/register';
import UserConfEmail from '../public/user/pages/confEmail';
import UserLoginPage from '../public/user/pages/login';
import UserSearchPage from '../public/user/pages/search';
import UserDetailPage from '../public/user/pages/detail';
import UserPaymentPage from '../public/user/pages/payment';
import UserBookingPage from '../public/user/pages/booking';
import UserProfilePage from '../public/user/pages/profile';

import AgentRegisterPage from '../public/agent/pages/register';
import AgentConfEmail from '../public/agent/pages/confEmail';
import AgentLoginPage from '../public/agent/pages/login';
import AgentBookingPage from '../public/agent/pages/booking';
import AgentPackageTourPage from '../public/agent/pages/packageTour';
import AgentSumAccountPage from '../public/agent/pages/sumAccount';

const components = {
    userLogin: {
        url: "user/login",
        component: UserLoginPage
    },
    userRegister: {
        url: "user/register",
        component: UserRegisterPage
    },
    userConfEmail: {
        url: "user/confirm_email",
        component: UserConfEmail
    },
    userSearch: {
        url: "user/search",
        component: UserSearchPage
    },
    userDetail: {
        url: "user/detail",
        component: UserDetailPage
    },
    userPayment: {
        url: "user/payment",
        component: UserPaymentPage
    },
    userBooking: {
        url: "user/booking",
        component: UserBookingPage
    },
    userProfile: {
        url: "user/profile",
        component: UserProfilePage
    },
    agentLogin: {
        url: "agent/login",
        component: AgentLoginPage
    },
    agentRegister: {
        url: "agent/register",
        component: AgentRegisterPage
    },
    agentConfEmail: {
        url: "agent/confirm_email",
        component: AgentConfEmail
    },
    agentBooking: {
        url: "agent/booking",
        component: AgentBookingPage
    },
    agentPackageTour: {
        url: "agent/package_tour",
        component: AgentPackageTourPage
    },
    agentSumAccount: {
        url: "agent/account",
        component: AgentSumAccountPage
    },

}
const permissions = {
    user: {
        allowedRoutes : [
            components.userLogin,
            components.userRegister,
            components.userConfEmail,
            components.userSearch,
            components.userDetail,
            components.agentLogin,
            components.agentRegister,
            components.agentConfEmail
        ],
        redirectRoutes: "user/search"
    },
    member: {
        allowedRoutes : [
            components.userSearch,
            components.userDetail,
            components.userPayment,
            components.userBooking,
            components.userProfile
        ],
        redirectRoutes: "user/search"
    },
    agent : {
        allowedRoutes: [
            components.agentBooking,
            components.agentPackageTour,
            components.agentSumAccount
        ],
        redirectRoutes: "agent/booking"
    }
}
export default permissions