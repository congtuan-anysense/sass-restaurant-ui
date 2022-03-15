import { lazy } from "react";
import { pathWithId } from "services/utils/path";

const Home = lazy(() => import("containers/Home"));
const ListCustomers = lazy(() => import("containers/CustomerManagement/List"));
const CustomerDetail = lazy(
  () => import("containers/CustomerManagement/Detail")
);
const UpsertCustomer = lazy(
  () => import("containers/CustomerManagement/Upsert")
);

const LayoutCreation = lazy(
  () => import("containers/tableManagement/LayoutManage")
);
export const PROTECTED_ROUTES = {
  home: {
    path: "/",
    component: Home,
  },
  customers_management__list: {
    path: "/customers",
    component: ListCustomers,
  },
  customers_management__register: {
    path: "/customers/register",
    component: UpsertCustomer,
  },
  customers_management__detail: {
    path: "/customer/:id",
    component: CustomerDetail,
    pathWithId: pathWithId,
  },
  customer_management__edit: {
    path: "/customer/edit/:id",
    component: UpsertCustomer,
    pathWithId: pathWithId,
  },
  // table layout
  table_management: {
    path: "/table-management",
    component: LayoutCreation,
  },
};
