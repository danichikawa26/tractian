import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AssetDetail from "./components/assets/assetDetail";
import WorkOrderDetail from "./components/workOrders/workOrderDetail";
import Dashboard from "./components/dashboard/dashboard";
import UnitDetail from "./components/units/unitDetail";
import UserDetail from "./components/users/userDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "assets/:assetId",
        element: <AssetDetail />
      },
      {
        path: "workorders/:workOrderId",
        element: <WorkOrderDetail />
      },
      {
        path: "units/:unitId",
        element: <UnitDetail />
      },
      {
        path: "users/:userId",
        element: <UserDetail />
      }
    ]
  }
]);
