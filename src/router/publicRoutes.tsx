import Login from "@/app/LoginPage";
import PATHS from "./paths";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import ActivateAccountPage from "@/app/ActivateAccountPage";
import HomePage from "@/app/HomePage";
import Navbar from "@/components/common/Navbar";

function publicRoutes(): RouteObject[] {
  return [
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Outlet />
        </>
      ),
      children: [
        {
          path: PATHS.HOME,
          element: <HomePage />,
        },
        {
          path: "*",
          element: <Navigate to={PATHS.HOME} replace />,
        },
      ],
    },
    {
      path: PATHS.ACTIVATE_ACCOUNT,
      element: <ActivateAccountPage />,
    },
    {
      path: PATHS.LOGIN,
      element: <Login />,
    },
  ];
}

export default publicRoutes;
