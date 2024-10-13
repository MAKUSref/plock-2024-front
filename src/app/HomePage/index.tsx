import CourseCardLarge from "@/components/course/CourseCardLarge";
import CourseList from "@/components/home/CourseList";
import HomeIntro from "@/components/home/Intro";
import { useGetSelfInfoQuery } from "@/redux/api/authApi";
import {
  useGetCoursesQuery,
  useGetMyCoursesQuery,
} from "@/redux/api/courseApi";
import { useAuth, useUserRole } from "@/redux/selectors";

const HomePage = () => {
  const { data: courses } = useGetCoursesQuery({});
  const { data: selfInfo } = useGetSelfInfoQuery();
  const { data: selfCourses } = useGetMyCoursesQuery();
  const isAuth = useAuth();
  const userRole = useUserRole();

  if (!isAuth || selfCourses?.length === 0) {
    return (
      <div>
        <div className=" absolute top-0 left-0 right-0 -z-10">
          <img
            src="/img/home-intro-top-2.svg"
            alt="..."
            className="w-full md:hidden"
          />
          <img
            src="/img/home-intro-top.svg"
            alt="..."
            className="w-full hidden md:block"
          />
        </div>
        <HomeIntro />
        <div className="container">
          <CourseList />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="absolute top-0 left-0 right-0 -z-10">
        <img src="/img/home-intro-top.svg" alt="..." className="w-full" />
      </div>
      <div className="container pt-60">
        {courses && (
          <div className="mb-10">
            <h3 className="text-4xl">
              <span className="mr-2">Witaj</span>
              <span className="text-primary bg-opacity-100">
                {selfInfo?.name}
              </span>
            </h3>
            <p className="text-base text-slate-500 mb-9">
              {userRole === "lecturer" &&
                "Oto najbliższe twoje szkolenia, które poprowadzisz"}
              {userRole === "user" &&
                "To najbliższe szkolenia na które jesteś zapisany"}
            </p>
            <CourseCardLarge course={courses[0]} />
          </div>
        )}
        <CourseList />
        <div className=""></div>
      </div>
    </div>
  );
};

export default HomePage;
