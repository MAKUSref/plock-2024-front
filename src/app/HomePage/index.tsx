import CourseCard from "@/components/course/CourseCard";
import HomeIntro from "@/components/home/Intro";
import { useGetCoursesQuery } from "@/redux/api/courseApi";
import { useAuth } from "@/redux/selectors";
import { Card, Skeleton } from "antd";

const HomePage = () => {
  const { data: courses, isLoading } = useGetCoursesQuery();

  const isAuth = useAuth();

  console.log(isAuth);

  return (
    <div>
      {isAuth ? (
        <h1 className="text-2xl font-bold">Witaj w panelu użytkownika</h1>
      ) : (
        <HomeIntro />
      )}

      <div className="container">
        {isLoading && (
          <Card loading cover={<Skeleton.Image active />}>
            <Card.Meta title="Nazwa szkolenia" description="Opis szkolenia" />
          </Card>
        )}

        <div className="mt-20 grid grid-cols-3 gap-4">
          {courses?.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
