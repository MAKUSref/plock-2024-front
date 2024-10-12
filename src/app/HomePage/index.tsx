import CourseList from "@/components/home/CourseList";
import HomeIntro from "@/components/home/Intro";
import { useAuth } from "@/redux/selectors";

const HomePage = () => {
  const isAuth = useAuth();

  console.log(isAuth);

  return (
    <div>
      <div className="absolute top-0 left-0 right-0 -z-10">
        <img
          src="/img/home-intro-top.svg"
          alt="..."
          className="w-full"
        />
      </div>
      {isAuth ? (
        <h1 className="text-2xl font-bold">Witaj w panelu użytkownika</h1>
      ) : (
        <HomeIntro />
      )}

      <div className="container">
        <CourseList />
      </div>
    </div>
  );
};

export default HomePage;
