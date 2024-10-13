import PATHS from "./paths";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import HomePage from "@/app/HomePage";
import Navbar from "@/components/common/Navbar";
import CoursePage from "@/app/CoursePage";
import WordCloudPage from "@/app/WordCloudPage";
import PassWordToCloudPage from "@/app/PassWordToCloudPage";

function publicRoutes(): RouteObject[] {
  return [
    {
      path: "/",
      element: (
        <div className="pb-40">
          <Navbar />
          <Outlet />
        </div>
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
    {
      path: PATHS.WORD_CLOUD,
      element: <WordCloudPage />,
    },
    {
      path: PATHS.ADD_WORD_TO_CLOUD,
      element: <PassWordToCloudPage />,
    },
  ];
}

export default publicRoutes;
