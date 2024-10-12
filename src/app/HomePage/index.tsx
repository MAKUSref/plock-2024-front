import CourseCard from "@/components/course/CourseCard";
import HomeIntro from "@/components/home/Intro";
import { useGetCoursesQuery } from "@/redux/api/courseApi";
import { Card, Skeleton } from "antd";

const HomePage = () => {
  const { data: courses, isLoading } = useGetCoursesQuery();

  return (
    <div>
      <HomeIntro />

      {isLoading && (
        <Card loading cover={<Skeleton.Image active />}>
          <Card.Meta title="Nazwa szkolenia" description="Opis szkolenia" />
        </Card>
      )}

      <div className=" grid grid-cols-3 gap-4">
        {courses?.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
