import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import staffReducer from "./features/staff/staff.slice";
import rolesReducer from "./features/roles/roles.slice";
import groupsReducer from "./features/groups/groups.slice";
import servicesReducer from "./features/services/services.slice";
import clientsReducer from "./features/clients/clients.slice";
import invoicesReducer from "./features/invoices/invoices.slice";
import couponsReducer from "./features/coupons/coupons.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    staff: staffReducer,
    roles: rolesReducer,
    groups: groupsReducer,
    services: servicesReducer,
    clients: clientsReducer,
    invoices: invoicesReducer,
    coupons: couponsReducer,
  },
});

export default store;
