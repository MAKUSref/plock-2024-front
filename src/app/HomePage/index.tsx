import CourseList from "@/components/home/CourseList";
import HomeIntro from "@/components/home/Intro";
import { useAuth, useUserRole } from "@/redux/selectors";

const HomePage = () => {
  const isAuth = useAuth();
  const userRole = useUserRole();

  console.log(userRole);

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
      {userRole?.toLowerCase() === "admin" && (
        <HomeIntro />
      )}

      {userRole?.toLowerCase() === "lecturer" && (
        <HomeIntro />
      )}

      {userRole?.toLowerCase() === "user" && (
        <HomeIntro />
      )}
      <div className="container">
        <CourseList />
      </div>
    </div>
  );
};

export default HomePage;
