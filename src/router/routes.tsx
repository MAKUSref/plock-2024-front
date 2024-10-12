import PATHS from "./paths";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import HomePage from "@/app/HomePage";
import Navbar from "@/components/common/Navbar";
import CoursePage from "@/app/CoursePage";

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
          path: PATHS.COURSE,
          element: <CoursePage />,
        },
        {
          path: "*",
          element: <Navigate to={PATHS.HOME} replace />,
        },
      ],
    },
  ];
}

export default publicRoutes;
