import { Navigate, RouteObject } from "react-router-dom";
import PATHS from "./paths";
import CoursesPage from "@/app/dashboard/CoursesPage/index.ts";

function privateRoutes(): RouteObject[] {
  return [
    {
      path: PATHS.DASHBOARD,
      element: <CoursesPage />,
    },
    { path: "*", element: <Navigate to={PATHS.DASHBOARD} replace /> },
  ];
}

export default privateRoutes;
