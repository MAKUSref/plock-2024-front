import CourseCardSmall from "@/components/course/CourseCardSmall";
import { useGetCoursesQuery } from "@/redux/api/courseApi";
import { Card, Skeleton } from "antd";

const HomePage = () => {
  const { data: courses, isLoading } = useGetCoursesQuery();

  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>Welcome, in our site</p>
      <h2>Dostępne kursy</h2>

      {isLoading && (
        <Card loading cover={<Skeleton.Image active />}>
          <Card.Meta title="Nazwa szkolenia" description="Opis szkolenia" />
        </Card>
      )}

      <div className=" grid grid-cols-3 gap-4">
        {courses?.map((course, index) => (
          <CourseCardSmall key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
