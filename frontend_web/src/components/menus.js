import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import React from "react";
import {IconHome, IconPayment, IconSignIn, IconSignOut} from "./utils/Incons";
import SalesIndexPage from "./pages/sales/SalesIndexPage";

const getMenus = (loggedIn, privileges) => {
    let pFilter = (m) => {
        return m.privilege === 'Anonymous' || (loggedIn && privileges.includes(m.privilege))
    }
    let menus = loggedIn ?
        [
            {id: 1, path: "/home", name: "Home", component: HomePage, Icon: () => <IconHome/>, privilege: 'Anonymous'},
            {
                id: 3,
                path: "/sales",
                name: "Sales",
                component: SalesIndexPage,
                Icon: () => <IconPayment/>,
                privilege: 'Sales.manage'
            },
            {
                id: 4,
                path: "/logout",
                name: "Logout",
                component: LogoutPage,
                Icon: () => <IconSignOut/>,
                privilege: 'Anonymous'
            },
        ] : [
            {id: 1, path: "/home", name: "Home", component: HomePage, Icon: () => <IconHome/>, privilege: 'Anonymous'},
            {
                id: 2,
                path: "/login",
                name: "Login",
                component: LoginPage,
                Icon: () => <IconSignIn/>,
                privilege: 'Anonymous'
            }
        ]
    return menus.filter(pFilter);
}
export default getMenus;
