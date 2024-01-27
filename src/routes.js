
import Orders from "./Pages/Orders.js";
import AddOrders from "./Pages/AddOrders.js";
import AddItems from "./Pages/AddItems.js";
import Reports from "./Pages/Reports.js";
import routerConstants from "./utils/routerConstants.js";

export const routes = [
  {
    name: "Reports",
    element: <Reports />,
    path: routerConstants.REPORTS,
  },
  {
    name: "orders",
    element: <Orders />,
    path: routerConstants.ORDER,
  },
  {
    name: "addOrders",
    element: <AddOrders />,
    path: routerConstants.ADD_ORDER
  },
  {
    name: "addItems",
    element: <AddItems />,
    path: routerConstants.ADD_ITEM
  },
];
