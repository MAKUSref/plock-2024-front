import CourseCardLarge from "@/components/course/CourseCardLarge";
import CourseList from "@/components/home/CourseList";
import HomeIntro from "@/components/home/Intro";
import { useGetCoursesQuery } from "@/redux/api/courseApi";
import { useAuth, useUserTokenInfo } from "@/redux/selectors";

const HomePage = () => {
  const { data: courses } = useGetCoursesQuery({});
  const userInfo = useUserTokenInfo();
  const isAuth = useAuth();
  // const userRole = useUserRole();

  console.log(userInfo);

  if (!isAuth) {
    return (
      <div>
        <div className="absolute top-0 left-0 right-0 -z-10">
          <img src="/img/home-intro-top.svg" alt="..." className="w-full" />
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
      {/* {userRole === "admin" && (
        <HomeIntro />
      )}

      {userRole === "lecturer" && (
        <HomeIntro />
      )}

      {userRole === "user" && (
        <HomeIntro />
      )} */}

      <div className="container pt-60">
        {courses && (
          <div className="mb-10">
            <h3 className="text-4xl">
              <span className="mr-2">Witaj</span>
              <span className="text-primary bg-opacity-100">Adam</span>
            </h3>
            <p className="text-base text-slate-500 mb-9">
              To najbliższe szkolenie na które jesteś zapisany
            </p>
            <CourseCardLarge course={courses[0]} />
          </div>
        )}
        <CourseList />
      </div>
    </div>
  );
};

export default HomePage;
