import Login from "@/app/LoginPage";
import PATHS from "./paths";
import { Navigate, RouteObject } from "react-router-dom";
import ActivateAccountPage from "@/app/ActivateAccountPage";
import HomePage from "@/app/HomePage";

function publicRoutes(): RouteObject[] {
  return [
    {
      path: PATHS.HOME,
      element: <HomePage />,
    },
    {
      path: PATHS.LOGIN,
      element: <Login />,
    },
    {
      path: PATHS.ACTIVATE_ACCOUNT,
      element: <ActivateAccountPage />,
    },
    {
      path: "*",
      element: <Navigate to={PATHS.HOME} replace />,
    },
  ];
}

export default publicRoutes;
