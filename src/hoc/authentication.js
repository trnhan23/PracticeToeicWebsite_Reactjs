import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login',
    //allowRedirectBack: true,
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/home',
    allowRedirectBack: false
});

// export const adminIsLogin = connectedRouterRedirect({
//     authenticatedSelector: state =>
//         state.user.isLoggedIn && state.user.userInfor?.roleId === 'R1',      
//     wrapperDisplayName: 'AdminIsLogin',
//     redirectPath: (state) => state.user.isLoggedIn ? '/unauthorized' : '/login', // Different redirect for unauthorized users
// });

